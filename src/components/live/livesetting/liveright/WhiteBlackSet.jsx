import React, { Component } from 'react'
import { Button, Modal,Input, Form, Row, Col } from 'antd';
import './style.less'
import { connectAlita } from 'redux-alita';
// import { VCloudAPI, YMOCKAPI } from '../../../axios/api';
// import { getObjFromLocalStorage } from '../../../utils/index';
// import { checkUserInfo } from '../../../utils/UserUtils';
import { withRouter } from 'react-router-dom';




class WhiteBlackSet extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    handleCancel() {
        this.props.setAlitaState({
            stateName: 'white_black_set',
            data: {
                visible: false,
            }
        })
    }

    handleOk() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.setAlitaState({
                    stateName: 'white_black_set',
                    data: {
                        visible: false,
                        white: values.white_name,
                        black: values.black_name
                    }
                });
            }

        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { white_black_set = {} } = this.props.alitaState;
        const { data } = white_black_set;
        const { visible = false, white = '', black = '' } = data || {};

        console.log(visible)

        return (
            <div>
                <Modal
                    visible={visible}
                    title="播放网站设置"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确认保存</Button>,
                    ]}>

                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onSubmit={this.handleOk}>
                        <Form.Item label="播放网站黑名单">
                            {getFieldDecorator('black_name', {
                                initialValue: black
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="播放网站白名单">
                            {getFieldDecorator('white_name', {
                                initialValue: white
                            })(
                                <Input />
                            )}
                        </Form.Item>


                        <Row>
                            <Col span={20} offset={5}>
                                <div className="warning-text">只需要填写域名，多个域名之间用英文分号分隔，
                                 如：domain.com;domain2.net;sub.domain3.net;</div>
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create()(WhiteBlackSet);


export default withRouter(connectAlita()(WrappedApp));
