import {Form, Input, Row, Col, Upload, Icon, Button, message, Modal} from 'antd';
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
    state = {
        modalVisible: false,
    };
    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }
    handleCancel() {
        this.setModalVisible(false)
    }
    handleOk() {

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            //读取表单数据
            let formData = {
                name:fieldsValue['name']
            }
            console.log(formData)
            this.props.setAlitaState({
                stateName:'video_setting',
                data:formData
            })
        })
        this.setModalVisible(false)
    }
    render() {


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
        const {getFieldDecorator} = this.props.form;
        const {video_setting = {}} = this.props.alitaState;
        console.log('video_setting',video_setting)

        return (
            <div>

                <Row type="flex" justify="space-around" align="middle">
                    <Col span="20">
                        <div>
                            <Button type="primary" onClick={() => this.setModalVisible(true)} size='large' icon = "edit">
                                视频设置
                            </Button>
                            <Modal
                                title="视频设置"
                                visible={this.state.modalVisible}
                                onOk={() => this.handleOk()}
                                okText="确认"
                                cancelText="取消"
                                onCancel={() => this.handleCancel()}
                            >
                                <Form className="form-style" {...formItemLayout} >
                                    <Form.Item label="标题">
                                        {getFieldDecorator('name', {
                                            initialValue:"",
                                            rules: [{message: '请输入视频标题'}],
                                        })(<Input/>)}
                                    </Form.Item>
                                    <Form.Item label="简介">
                                        {getFieldDecorator('introduction', {
                                            initialValue:""
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
                            </Modal>

                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default connectAlita()(Form.create()(VideoSetting));
