import React, {Component} from 'react';
import {Row, Col, Card, Button, Icon, message, Upload} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {connectAlita} from 'redux-alita'


const fileList = [];
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    },
};


class VideoUpload extends Component {

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="我的点播"/>
                <div className="gutter-box">
                    <Card title='上传视频' bordered={false}>
                        <Upload
                            {...props}
                        >
                            <Button>
                                <Icon type="upload"/> 点击上传视频
                            </Button>
                        </Upload>
                    </Card>
                </div>
            </div>

        )
    }
}

export default connectAlita()(VideoUpload)