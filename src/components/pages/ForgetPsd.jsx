/**
 * 登录界面
 */

// todo

import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,message
} from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../axios/api'
import { Link } from 'react-router-dom'
class ForgetPsd extends React.Component {
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
                <Row className="forget-row" type="flex" justify="space-around" align="middle">
                    <Col className="forget-colum" span="5">
                        <div className="forget-form">
                            <div className="forget-text">忘记密码</div>
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
                                
                                <Form.Item {...tailFormItemLayout}>
                                    <Button className="forget-button" type="primary" htmlType="submit">
                                        密码重置 </Button>
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