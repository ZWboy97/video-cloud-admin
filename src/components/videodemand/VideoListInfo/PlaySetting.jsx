import {
    Form, Input, Select, Row, Col, message, DatePicker, Icon, Upload
} from 'antd';
import React from 'react';
import {connectAlita} from 'redux-alita';


class PlaySetting extends React.Component {


    render() {
        const {Option} = Select;

        console.log('1')

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
                                        <Select  placeholder="请选择播放器大小">
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
                                        <Select  placeholder="请选择默认画质">
                                            <Option value="360p">流畅</Option>
                                            <Option value="720p">高清</Option>
                                            <Option value="1080p">超清</Option>
                                        </Select>)}
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connectAlita()(Form.create()(PlaySetting));
