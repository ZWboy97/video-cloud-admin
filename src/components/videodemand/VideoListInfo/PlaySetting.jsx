import {
    Form, Select, Row, Col, Button, Modal
} from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';


class PlaySetting extends React.Component {

    state = {
        modalVisible: false,
    };
    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    render() {
        const { Option } = Select;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="20">
                        <div>
                            <Button type="primary" onClick={() => this.setModalVisible(true)} size="large" icon="form">
                                播放设置
                            </Button>
                            <Modal
                                title="播放设置"
                                visible={this.state.modalVisible}
                                onOk={() => this.setModalVisible(false)}
                                okText="确认"
                                cancelText="取消"
                                onCancel={() => this.setModalVisible(false)}
                            >
                                <Form>
                                    <Form.Item label="播放器名称">
                                        {getFieldDecorator('name', {
                                            initialValue: "1",
                                        })(
                                            <Select placeholder="请选择播放器" >
                                                <Option value="1">默认播放器</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="播放器大小">
                                        {getFieldDecorator('size', {
                                            initialValue: "600",
                                        })(
                                            <Select placeholder="请选择播放器大小">
                                                <Option value="300">300</Option>
                                                <Option value="600">600</Option>
                                                <Option value="970">970</Option>
                                            </Select>,
                                        )}
                                    </Form.Item>
                                    <Form.Item label="默认画质">
                                        {getFieldDecorator('resolving', {
                                            initialValue: '720p'
                                        })(
                                            <Select placeholder="请选择默认画质">
                                                <Option value="360p">流畅</Option>
                                                <Option value="720p">高清</Option>
                                                <Option value="1080p">超清</Option>
                                            </Select>)}
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

export default connectAlita()(Form.create()(PlaySetting));
