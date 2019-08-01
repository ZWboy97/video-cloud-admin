import { Row, Col, Radio, Form, Input, Slider, Button } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';



class LampSetting extends React.Component {

    onChange = e => {
        if (e.target.value === 1) {
            const fixContent = (
                <div >
                    <Row>
                        <Col span={9} offset={5}>
                            <Input placeholder="请输入跑马灯内容" />
                        </Col>
                    </Row>
                    <Row >&nbsp;</Row>
                </div>
            );
            this.props.setAlitaState({
                stateName: 'lamp_type',
                data: {
                    content: fixContent,
                }
            })
        }
        else if (e.target.value === 2) {
            const userContent = (
                <div>
                    <Row>
                        <Col span={12} offset={5}>
                            <div className="text-style">
                                按登录用户名进行跑马灯显示，设置白名单/自定义授权后则显示进入用户名，无设置则显示系统默认用户名。
                    </div>
                        </Col>
                    </Row>
                    <Row >&nbsp;</Row>
                </div>

            );
            this.props.setAlitaState({
                stateName: 'lamp_type',
                data: {
                    content: userContent,
                }
            })
        }
        console.log('radio checked', e.target.value);
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const fixContent = (
            <div >
                <Row>
                    <Col span={9} offset={5}>
                        <Input placeholder="请输入跑马灯内容" />
                    </Col>
                </Row>
                <Row >&nbsp;</Row>
            </div>
        );

        const { lamp_type = {} } = this.props.alitaState;
        const { data } = lamp_type;
        const { content = fixContent } = data || {};

        return (
            <div>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 9 }}>
                    <Form.Item label="跑马灯类型">
                        {getFieldDecorator('type', {
                            initialValue: 1
                        })(
                            <Radio.Group onChange={this.onChange}>
                                <Radio value={1}>固定值</Radio>
                                <Radio value={2}>登陆用户名</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>

                    <div>
                        {content}
                    </div>
                    <Form.Item label="字体">
                        {getFieldDecorator('textType', {
                            initialValue: 20
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="透明度">
                        {getFieldDecorator('transparency', {
                            initialValue: 30
                        })(
                            <Slider />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Row>
                            <Col span={2} offset={22}>
                                <Button type="primary">保存</Button>
                            </Col>
                        </Row>
                    </Form.Item>


                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LampSetting))