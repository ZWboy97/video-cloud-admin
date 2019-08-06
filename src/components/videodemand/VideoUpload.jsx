import React, { Component } from 'react';
import { Row, Col, Card, Button, Icon, message, Upload } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { connectAlita } from 'redux-alita';
import OssUploader from '../../utils/OssUploader';
import {STSAPI,TESTJYLAPI} from "../../axios/api";


class VideoUpload extends Component {

    options = {
        config: {
            region: 'oss-cn-beijing',
            accessKeyId: "",
            accessKeySecret: "",
            stsToken: "",
            bucket: 'video-cloud-bupt',
        },
        dirname: '',
        progress: (percent) => {
            console.log('上传进度:', parseInt(percent * 100));
        }

    }

    componentDidMount(){
        STSAPI.get('/ljczjnjyl/').then(res =>{
            console.log(res)
            this.options.config.accessKeySecret = res.data.AccessKeySecret
            this.options.config.accessKeyId = res.data.AccessKeyId
            this.options.config.stsToken = res.data.SecurityToken
            console.log('options',this.options)
        })
    }

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="我的点播" />
                <div className="gutter-box">
                    <Card title='上传视频' bordered={false}>
                        <Upload
                            beforeUpload={this.beforeUpload}
                        >
                            <Button>
                                <Icon type="upload" /> 点击上传视频
                            </Button>
                        </Upload>
                    </Card>
                </div>
            </div>

        )

    }
    beforeUpload = file => {
        console.log('beforeuploas')

        // 创建Uploader
        const upload = new OssUploader({
            ...this.options,                 // 与文件无关的一些配置
            file,                       // 待上传的文件
        });
        console.log('options',this.options)
        // 开始上传
        upload.start(
            res => {
                console.log('OSS上传返回结果', res)
                if (res.res.status === 200) {
                    message.success('文件上传成功');
                    const url = res.res.requestUrls[0].substring(0,res.res.requestUrls[0].indexOf('?'));
                    console.log('上传文件的返回URL为', url);
                    let data = {
                        aid:'test',
                        name:res.name,
                        rtype:'video',
                        size:3.0,
                        label:'默认',
                        res_url:url,
                        pic_url:url+'&x-oss-process=video/snapshot,t_1000,f_jpg,w_800,h_600,m_fast',
                    }
                    TESTJYLAPI.post('com/test/resourses/',data).then(res=>{
                        console.log('res=>',res)})

                } else {
                    message.error('文件上传失败');
                }
            },
            error => {
                message.error('文件上传失败');
            }
        );
        return false;       // 在这里，我们自己通过OSS上传，所以返回false，拦截Upload自己的上传
    }

    progress = (percent) => {
        console.log('上传进度:', parseInt(percent * 100));
    }
}

export default connectAlita()(VideoUpload)