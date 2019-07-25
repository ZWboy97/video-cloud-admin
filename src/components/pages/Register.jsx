/**
 * 登录界面
 * @author NingNing.Wang
 */
import React from 'react';
import {
    Form, Input, Tooltip, Icon, Row, Col, Button, message
} from 'antd';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../axios/api'
import { Link, withRouter } from 'react-router-dom'
class Register extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                VCloudAPI.post('user/register',
                    {
                        email: values.email,
                        user_name: values.user_name,
                        password: values.password
                    })
                    .then(response => {
                        console.log('register response:', response)
                        if (response.status === 200) {
                            const { data } = response;
                            if (data.code === 200) {
                                message.info("注册成功");
                                this.props.history.push('/login');
                            } else {
                                message.info('注册失败');
                            }
                        } else {
                            message.warning("注册失败，请重新尝试");
                        }
                    }).catch(r => {
                        message.warning("网络错误，注册失败");
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
            callback('两次输入的密码不一致');
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
                <Row className="register-row" type="flex" justify="space-around" align="middle">
                    <Col className="register-colum" span={5}>
                        <div className="register-form">
                            <div className="register-text">欢迎注册</div>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label="邮箱">
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: '请输入合法的邮箱地址',
                                            },
                                            {
                                                required: true,
                                                message: '请输入您的邮箱地址',
                                            },
                                        ],
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <span>
                                            用户名&nbsp;
                                                <Tooltip title="您的个性化昵称">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('user_name', {
                                        rules: [{ required: true, message: '请输入您的用户昵称', whitespace: true }],
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
                                <Form.Item {...tailFormItemLayout}>
                                    <Button className="register-button" type="primary" htmlType="submit">
                                        注册 </Button>
                                    <Link
                                        to='/login'>
                                        &nbsp;&nbsp;&nbsp;?&nbsp;已有账号，去登陆
                                        </Link>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(connectAlita()(Form.create()(Register)));