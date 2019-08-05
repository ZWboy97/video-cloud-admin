import React, { Component } from 'react';
import { Row, Col, Card, Button, Icon, message, Upload } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { connectAlita } from 'redux-alita';
import OssUploader from '../../utils/OssUploader';

class VideoUpload extends Component {

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
        // 配置STS Token， 之后需要从STS服务器去取
        const options = {
            config: {
                region: 'oss-cn-beijing',
                accessKeyId: "STS.NJcghefdsatk9C6Qfb6XGzVRb",
                accessKeySecret: "56UE7nBjtM5uUQCm3kr6f2MTRRsc6JDC7SrhY7AmScKX",
                stsToken: "CAISkwJ1q6Ft5B2yfSjIr4nWLNLRi7tS1raAO2WHtWY3OtdrlZP5gDz2IH1KeHBsAugctvw/mmFX7PgSlqB6T55OSAmcNZIoBlGAGq3kMeT7oMWQweEuuv/MQBquaXPS2MvVfJ+OLrf0ceusbFbpjzJ6xaCAGxypQ12iN+/m6/Ngdc9FHHP7D1x8CcxROxFppeIDKHLVLozNCBPxhXfKB0ca3WgZgGhku6Ok2Z/euFiMzn+Ck7dL99mgfsT1MJE8Yc8jD+3YhrImKvDztwdL8AVP+atMi6hJxCzKpNn1ASMKvkvaaraPqoc3dF8nN/dgRf5e3/H4lOxlvOvIjJjwyBtLMuxTXj7WWIe62szAFfM14h+KhSJhUhqAAQLSvcrMjulCjF+FBxvglcQ7LHhNBgDcP1EFu5A16zf6xlXUfg8p1nezLZs5m1SCcfM4UUN3DqfB+mqMjL03s63SbhQXgN8woKO7UB+6Nfn5z2Pdt7l9mcmGAc7LHNTcWo8rVJTyml+NWzdA4w9l58ex3r2THu5MOdhn+hjihpic",
                bucket: 'video-cloud-bupt',
            },
            dirname: '',
            progress: this.progress,

        }
        // 创建Uploader
        const upload = new OssUploader({
            ...options,                 // 与文件无关的一些配置
            file,                       // 待上传的文件
        });
        // 开始上传
        upload.start(
            res => {
                console.log('OSS上传返回结果', res)
                if (res.res.status === 200) {
                    message.success('文件上传成功');
                    const url = res.res.requestUrls[0];
                    console.log('上传文件的返回URL为', url);
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