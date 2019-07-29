import { Form, Row, Col, Input, Select, Icon, Switch,Button } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';


class PayCondition extends React.Component {


    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;

        return (
            <div >
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 7 }} onSubmit={this.handleOk}>

                    <Form.Item label="欢迎标题">
                        {getFieldDecorator('title', {
                            initialValue: "欢迎观看本次直播",

                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="观看价格">
                        {getFieldDecorator('price', {

                        })(<Input placeholder={"请输入观看直播所需要的价格"} />)}
                    </Form.Item>
                    <Form.Item label="付费有效期">
                        {getFieldDecorator('time', {
                            initialValue: "forever",

                        })(
                            <Select placeholder="请选择直播规模" >
                                <Option value="forever">一次付费永久有效</Option>
                                <Option value="one month">一个月有效</Option>
                                <Option value="one year">一年有效</Option>
                            </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="试看">
                        {getFieldDecorator('try', {

                        })(
                            <Switch
                                defaultChecked
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Row>
                            <Col span={3} offset={18}>
                            <Button className="save-button" type="primary" htmlType="submit" className="login-form-button">保存</Button>
                    </Col>
                    </Row>
                    
                    </Form.Item>
                    

                </Form>
            </div>
        );
    }

}
export default connectAlita()(Form.create()(PayCondition));