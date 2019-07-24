import React, { Component } from 'react'
import { Button, Modal, Form, Select, Input, DatePicker, Row, Col } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './style.less'
import { connectAlita } from 'redux-alita';



class CreateLinkModal extends Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel() {
        this.props.setAlitaState({
            stateName: 'create_link_modal',
            data: {
                visible: false
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log('alitastate', this.props.alitaState);
        console.log('lalala')
        const { create_link_modal = {} } = this.props.alitaState;
        const { data } = create_link_modal;
        const { visible = false } = data || {};
        console.log('alitastate', this.props.alitaState);

        return (
            <div>
                <Modal
                    visible={visible}
                    title="直播链接"
                    onCancel={this.handleCancel}
                    footer={null}
                    width={600}
                >

                    <Form labelCol={{ span: 6}} wrapperCol={{ span: 18 }} onSubmit={this.handleOk}>

                        <Form.Item label="推流地址">
                            <Row >
                                <Col span={12}>
                                    <Input disabled={true} placeholder='请输入直播频道名称' />
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">&nbsp;&nbsp;&nbsp;&nbsp;打开链接</a>
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">复制链接</a>
                                </Col>

                            </Row>
                        </Form.Item>

                        <Form.Item label="拉流地址">
                            <Row >
                                <Col span={12}>
                                    <Input disabled={true} placeholder='hls:' />
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">&nbsp;&nbsp;&nbsp;&nbsp;打开链接</a>
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">复制链接</a>
                                </Col>

                            </Row>
                        </Form.Item>

                        <Form.Item label="拉流地址">
                        <Row >
                                <Col span={12}>
                                    <Input disabled={true} placeholder='rtmp:' />
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">&nbsp;&nbsp;&nbsp;&nbsp;打开链接</a>
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">复制链接</a>
                                </Col>

                            </Row>
                        </Form.Item>
                        <Form.Item label="拉流地址">
                        <Row >
                                <Col span={12}>
                                    <Input disabled={true} placeholder='https-flv:' />
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">&nbsp;&nbsp;&nbsp;&nbsp;打开链接</a>
                                </Col>
                                <Col span={5}>
                                    <a className="live-link" href="#">复制链接</a>
                                </Col>

                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create({ name: 'coordinate' })(CreateLinkModal);


export default connectAlita()(WrappedApp);
