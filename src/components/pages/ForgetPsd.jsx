/**
 * 登录界面
 */

// todo

import {
    Form, Input, Row, Col, Button, message
} from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../axios/api';

class ForgetPsd extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount() {
        document.title = '忘记密码';
    }

    handleGetCode = e => {
        e.preventDefault();
        const email_phone = this.props.form.getFieldValue("email_phone")

        VCloudAPI.post('/user/update/vcode/',
            {
                method: email_phone,
            })
            .then(response => {
                console.log('register response:', response)
                if (response.status === 200) {
                    const { data } = response;
                    if (data.code === 200) {
                        message.info("已发送验证码");
                    } else {
                        message.info('获取验证码失败');
                    }
                } else {
                    message.warning("获取验证码失败，请重新尝试");
                }
            }).catch(r => {
                message.warning("网络错误，注册失败");
            }).finally(() => {
                this.setState({ logining: false })
            });


    }

    /**
     * 处理用户点击登录按钮
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                VCloudAPI.post('/user/update/password/?cvcode=' + values.cvcode,
                    {
                        method: values.email_phone,
                        password: values.password

                    })
                    .then(response => {
                        console.log('register response:', response)
                        if (response.status === 200) {
                            const { data } = response;
                            if (data.code === 200) {
                                message.info("修改成功");
                                this.props.history.push('/login');
                            } else {
                                message.info('修改失败');
                            }
                        } else {
                            message.warning("修改失败，请重新尝试");
                        }
                    }).catch(r => {
                        message.warning("网络错误，修改失败");
                    }).finally(() => {
                        this.setState({ logining: false })
                    });
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div className="login-container">
                <Row className="forget-row" type="flex" justify="space-around" align="middle">
                    <Col className="forget-colum" span="5">
                        <div className="forget-form">
                            <div className="forget-text">忘记密码</div>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label="邮箱/手机号">
                                    {getFieldDecorator('email_phone', {
                                        rules: [
                                            {
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ],
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="密码" hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入您的密码',
                                            },
                                            {
                                                validator: this.validateToNextPassword,
                                            },
                                        ],
                                    })(<Input.Password />)}
                                </Form.Item>
                                <Form.Item label="密码确认" hasFeedback>
                                    {getFieldDecorator('confirm', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请确认您的密码',
                                            },
                                            {
                                                validator: this.compareToFirstPassword,
                                            },
                                        ],
                                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                                </Form.Item>
                                <Form.Item label="验证码" >
                                    {getFieldDecorator('cvcode', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入验证码',
                                            }
                                        ],
                                    })(<div>
                                        <Row>
                                            <Col span={15}>
                                                <Input />
                                            </Col>
                                            <Col span={6} offset={3}>
                                                <a href="javascript:;" onClick={this.handleGetCode}><u>获取验证码</u></a>
                                            </Col>
                                        </Row>
                                    </div>)}
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button className="forget-button" type="primary" htmlType="submit">
                                        确定重置 </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default connectAlita(['auth'])(Form.create()(ForgetPsd));;