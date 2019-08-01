import React, { Component } from 'react'
import { Button, Modal, Form, Select, Input, DatePicker, Row, Col } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './style.less'
import { connectAlita } from 'redux-alita';



class LiveUrlModal extends Component {

    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel() {
        this.props.setAlitaState({
            stateName: 'live_url_modal',
            data: {
                visible: false
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { live_url_modal = {} } = this.props.alitaState;
        const { data } = live_url_modal;
        const { visible = false, liveData = {} } = data || {};

        return (
            <div>
                <Modal
                    visible={visible}
                    title="直播链接"
                    onCancel={this.handleCancel}
                    footer={null}
                    width={600}
                >

                    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onSubmit={this.handleOk}>

                        <Form.Item label="推流地址">
                            <Row >
                                <Col span={16}>
                                    <Input placeholder='推流地址' value={liveData.push_url} />
                                </Col>
                                <Col span={8}>
                                    <a className="live-link" href="javascript:;" onClick={(e) => {
                                        e.preventDefault();
                                    }}>&nbsp;&nbsp;&nbsp;&nbsp;复制链接</a>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item label="HLS拉流地址">
                            <Row >
                                <Col span={16}>
                                    <Input placeholder='HLS协议直播拉流地址' value={liveData.pull_hls_url} />
                                </Col>
                                <Col span={8}>
                                    <a className="live-link" href="javascript:;" onClick={(e) => {
                                        e.preventDefault();
                                    }}>&nbsp;&nbsp;&nbsp;&nbsp;复制链接</a>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item label="FLV拉流地址">
                            <Row >
                                <Col span={16}>
                                    <Input placeholder='HTTP-FLV直播拉流地址' value={liveData.pull_rtmp_url} />
                                </Col>
                                <Col span={8}>
                                    <a className="live-link" href="javascript:;" onClick={(e) => {
                                        e.preventDefault();
                                    }}>&nbsp;&nbsp;&nbsp;&nbsp;复制链接</a>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item label="播放页面地址">
                            <Row >
                                <Col span={16}>
                                    <Input placeholder='直播页面地址' value={liveData.display_url} />
                                </Col>
                                <Col span={8}>
                                    <a className="live-link" href="javascript:;" onClick={(e) => {
                                        e.preventDefault();
                                    }}>&nbsp;&nbsp;&nbsp;&nbsp;打开链接</a>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create({ name: 'coordinate' })(LiveUrlModal);


export default connectAlita()(WrappedApp);