import {Form, Input, Row, Col, Upload,Icon,Button,message} from 'antd';
import React from 'react';
import {connectAlita} from 'redux-alita';

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
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class VideoSetting extends React.Component {
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {


        console.log('1')
        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 11},
            },
        };
        console.log('2')
        const {getFieldDecorator} = this.props.form;
        console.log('3')
        const {edit_info = {}} = this.props.alitaState;
        const {data} = edit_info;
        const {disable = true} = data || {};

        return (
            <div>

                <Row type="flex" justify="space-around" align="middle">
                    <Col span="20">
                        <div>
                            <Form className="form-style" {...formItemLayout} >
                                <Form.Item label="标题">
                                    {getFieldDecorator('name', {
                                        initialValue: "",
                                        rules: [{required: true, message: '请输入视频标题'}],
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label="标签">
                                    {getFieldDecorator('tag', {
                                        initialValue: "",
                                        rules: [{required: true, message: '请输入视频标签'}],
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label="外链">
                                    {getFieldDecorator('link', {
                                        initialValue: "",
                                    })
                                    (<Input/>)
                                    }
                                </Form.Item>
                                <Form.Item label="简介">
                                    {getFieldDecorator('introduction', {
                                        initialValue: ""
                                    })(<Input/>)}
                                </Form.Item>
                                <Form.Item label="封面">
                                    <div className="dropbox">
                                        {getFieldDecorator('dragger', {
                                            valuePropName: 'fileList',
                                            getValueFromEvent: this.normFile,
                                        })(
                                            <Upload {...props}>
                                                <Button>
                                                    <Icon type="upload" /> 点击上传封面
                                                </Button>
                                            </Upload>,
                                        )}
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default connectAlita()(Form.create()(VideoSetting));
