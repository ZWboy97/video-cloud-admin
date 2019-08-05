import React, {Component} from 'react';
import {Row, Col, Card, Button, Icon, message, Upload} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {connectAlita} from 'redux-alita'
import {STSAPI} from '../../axios/api'

const OSS = require('ali-oss')

const client = async () => {

    const token = await STSAPI.get('/ljczjnjyl/')

    console.log(token)
    return new OSS({
        accessKeyId: token.data.AccessKeyId,
        accessKeySecret: token.data.AccessKeySecret,
        bucket: 'video-cloud-bupt',
        region: 'oss-cn-beijing.aliyuncs.com',
        //stsToken:token.data.SecurityToken
    });

}
const uploadPath = (path, file) => {
    return `${path}/${file.name.split(".")[0]}-${file.uid}.${file.type.split("/")[1]}`
}

const UploadToOss = (path, file) => {
    const url = uploadPath(path, file)
    console.log(client())
    return new Promise((resolve, reject) => {
        client.put('123', new Buffer(file.buffer)).then(data => {
            resolve(data);
        }).catch(error => {
            reject(error)
        })
    })
}


class VideoUpload extends Component {


    state = {

        preview: "",
        visible: false,
        videoList: [],
        loading: false
    }


    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            this.setState({loading: false,})
        }
    }


    render() {
        const props = {
            onRemove: (file) => {
                this.setState(({videoList}) => {
                    const index = videoList.indexOf(file);
                    const newFileList = videoList.slice();
                    newFileList.splice(index, 1);
                    return {videoList: newFileList};
                });
            },
            beforeUpload: this.beforeUpload,
            fileList: this.state.videoList,
            onPreview: this.handlePreview,
            accept: "video/*",
            listType: "picture-card",
            onChange: this.handleChange
        };

        const {preview, visible, videoList} = this.state


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

    beforeUpload = file => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            UploadToOss('test', file).then(data => {
                this.setState(({videoList}) => ({
                    videoList: [{
                        uid: file.uid,
                        name: file.name,
                        status: file.status,
                        type: file.type,
                        result: data.name,
                        url: reader.result
                    }],
                }));
            })
        }
        return false;
    }

    handlePreview = (file) => {
        this.setState({
            preview: file.url || file.thumbUrl,
            visible: true,
        });
    }
}

export default connectAlita()(VideoUpload)