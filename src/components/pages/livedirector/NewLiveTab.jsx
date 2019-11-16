import React from 'react';
import { connectAlita } from 'redux-alita';
import { Form, Input, Row, Col, Button } from 'antd';
class NewLiveTab extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(getFieldDecorator)
        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 17 }}>
                    <Form.Item label="备注名">
                        {getFieldDecorator('live_name', {
                            //rules: [{ required: true, message: '请输入视频备注名' }],
                        })(<Input placeholder='请输入视频备注名' />)}
                    </Form.Item>

                    <Form.Item label="推流">
                        {getFieldDecorator('push_url', {

                        })(
                            <div>
                                <div className="warn-text-style">推流设备（如OB软件）请填写下方地址</div>
                                <div className="push-url-text">
                                    rtmp://39.106.194.43:1935/live/KxWNwufTeO/?auth_key=e6710d6820d988392f303e2e423bbe9c
                                </div>
                                <Row>
                                    <Col span={8}>
                                        <Button type="link" >复制推流链接</Button>
                                    </Col>
                                    <Col span={2} offset={1}>
                                        <Button type="link" >更换推流链接</Button>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default connectAlita()(Form.create()(NewLiveTab));