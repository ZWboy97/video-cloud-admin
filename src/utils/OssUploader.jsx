/**
 * OSS文件上传工具封装
 */
import { STSAPI } from '../axios/api';

class OssUploader {

    constructor(option) {
        this.file = option.file;                //  待上传的文件
        this.dirname = option.dirname || '';    //  OSS文件目录
        this.config = option.config;            //  与OSS STS及及安全相关的配置
        this.progress = option.progress;        // 函数，用于调用者组件在文件上传过程中对组件进行处理
        this.client = null;                     // 上传Client
        this.state = 'wait';                    // 文件上传的状态，{wait,stop,start,compelete,delete}
        this.objectKey = '';                    // 文件最终在OSS上的文件名字key 
        this.percent = 0;                       // 文件上传的进度数值
        this.filetype = '';                     // 从待上传文件中解析出的文件类型
        this.init();
    }

    // 初始化文件上传工具
    init() {
        // 生成一个objectkey oss关键字
        this.createObjectName();
        // 构造一个oss client
        this.createClient()
    }

    // 生成最终的对象存储Name(由文件路径+随机值+文件后缀组成)
    createObjectName() {
        var filename = this.file.name;
        var suffix = this.getSuffix(filename);
        var dirname = this.dirname;
        this.objectKey = dirname + this.randomString(10) + suffix
    }

    // 创建用于上传文件的Client
    createClient() {
        const config = this.config;
        const client = new window.OSS.Wrapper({
            ...config
        });
        this.client = client;
    }

    // 开始文件上传， 支持断点续传
    start(resolve, reject) {
        var co = window.OSS.co;
        var objectKey = this.objectKey
        var file = this.file;
        var that = this;
        var progress = this.progress;
        if (this.state === 'wait') {
            // 从之前断开的位置继续上传
            var client = this.client;
            co(function* () {
                try {
                    var result = yield client.multipartUpload(objectKey, file, {
                        progress: function* (p, checkpoint) {
                            that.percent = p;
                            progress(p)
                            console.log(p)
                            that.tempCheckpoint = checkpoint;
                        },
                    })
                    // success callback
                    if (result.res.status == 200) {
                        resolve && resolve(result);
                    }
                    console.log('success callback ')
                } catch (error) {
                    console.log(error)
                    if (client.isCancel()) {
                        //do something
                        reject && reject(error);
                    }
                }
            })
        } else {
            // 重新上传需要重新创建client
            this.createClient();
            var client = this.client;
            co(function* () {
                try {
                    var result = yield client.multipartUpload(objectKey, file, {
                        progress: function* (p, checkpoint) {
                            // tempCheckpoint = checkpoint;
                            that.percent = p;
                            progress(p)
                            that.tempCheckpoint = checkpoint;
                        },
                        checkpoint: that.tempCheckpoint,
                    })
                    // success callback
                    if (result.res.status == 200) {
                        resolve && resolve(result);
                    }
                } catch (error) {
                    if (client.isCancel()) {
                        reject && reject(error);
                        //do something
                    }
                }

            })
        }
    }

    // 中断上传
    stop() {
        var client = this.client;
        client.cancel();
        this.state = 'stop'
    }

    // 生成随机序列
    randomString(len) {
        len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    // 获取上传文件的后缀
    getSuffix(filename) {
        var pos = filename.lastIndexOf('.')
        var suffix = ''
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        this.filetype = suffix;
        return suffix;
    }
}
export default OssUploader;
