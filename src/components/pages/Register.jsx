/**
 * 注册界面
 */

// todo

import {
    Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, AutoComplete,message
} from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../axios/api'
import { Link } from 'react-router-dom'
class Register extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { setAlitaState } = this.props;
                VCloudAPI.post('user/register', { user_name: values.user_name, password: values.password, email: values.email})
                    .then(response => {
                        console.log(response);
                        console.log(response.data);
                        console.log(response.status);
                        if (response.status === 201) {
                           message.info("注册成功");
                           console.log("111");

                        } else {
                            message.warning("注册失败");
                            console.log("222");
                        }
                    }).catch(r => {
                      
                    }).finally(() => {
                        this.setState({ logining: false })
                    });

            }
        });
    };

    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //         }
    //     });
    // };

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
                <Row className="register-row" type="flex" justify="space-around" align="middle">
                    <Col className="register-colum" span="5">
                        <div className="register-form">
                            <div className="register-text">欢迎注册</div>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item label="邮箱">
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ],
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <span>
                                            用户名&nbsp;
                                                <Tooltip title="What do you want others to call you?">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    }
                                >
                                    {getFieldDecorator('user_name', {
                                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                                    })(<Input />)}
                                </Form.Item>

                                <Form.Item label="密码" hasFeedback>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your password!',
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
                                                message: 'Please confirm your password!',
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
export default connectAlita(['auth'])(Form.create()(Register));;