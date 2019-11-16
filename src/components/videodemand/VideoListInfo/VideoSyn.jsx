import {Form, Input, Row, Col, Upload, Icon, Button, message, Modal} from 'antd';
import React from 'react';
import {connectAlita} from 'redux-alita';
import {TESTJYLAPI} from '../../../axios/api'

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
                name:fieldsValue['name'],
                url:fieldsValue['url']
            }
            console.log(formData)
            let data = {
                aid:JSON.parse(localStorage.user).aid,
                name:formData.name,
                rtype:'video',
                size:3.0,
                label:['默认列表'],
                res_url:formData.url,
                pic_url:formData.url+'&x-oss-process=video/snapshot,t_1000,f_jpg,w_800,h_600,m_fast',
            }
            TESTJYLAPI.post('com/'+JSON.parse(localStorage.user).cid+'/resourses/',data).then(res=>{
                console.log('res=>',res)})
        })
        this.setModalVisible(false)
    }
    render() {


        // const disable = () =>{
        //     if (typeof(rowSelect) !== 'undefined' && typeof(rowSelect.selectedRows) !== 'undefined') {
        //         if (rowSelect.selectedRows.length() === 1){
        //             return true
        //         }
        //     }
        //     return false
        // }

        // console.log(disable())
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
        return (
            <div>

                <Row type="flex" justify="space-around" align="middle">
                    <Col span="20">
                        <div>
                            <Button type="primary" onClick={() => this.setModalVisible(true)} size='large' icon = "edit" >
                                视频同步
                            </Button>
                            <Modal
                                title="视频同步"
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
                                    <Form.Item label="url">
                                        {getFieldDecorator('introduction', {
                                            initialValue:""
                                        })(<Input/>)}
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
