import { Form, Row, Col, Input, Button } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';


class VerifyCondition extends React.Component {


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 7 }} onSubmit={this.handleOk}>

                    <Form.Item label="验证码">
                        {getFieldDecorator('code', {

                        })(<Input placeholder={"请输入验证码"} />)}
                    </Form.Item>

                    <Form.Item >
                        <Row>
                            <Col span={2} offset={22}>
                                <Button className="save-butto" type="primary" htmlType="submit" >保存</Button>
                            </Col>
                        </Row>

                    </Form.Item>


                </Form>
            </div>
        );
    }

}
export default connectAlita()(Form.create()(VerifyCondition));