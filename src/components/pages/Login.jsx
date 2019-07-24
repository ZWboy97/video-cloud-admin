/**
 *  用户登录页面
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Spin, message, Layout } from 'antd';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../axios/api'
import { Link, withRouter } from 'react-router-dom'
const FormItem = Form.Item;

class Login extends React.Component {

    //控制的state，不从Redux中读取
    state = {
        logining: false
    }

    /**
     * 处理用户点击登录按钮
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { setAlitaState } = this.props;
                console.log('userName:', values.userName)
                VCloudAPI.post('user/login_by_name/ljc', { user_name: values.userName, passWord: values.password })
                    .then(response => {
                        console.log('登录请求结果', response.data);
                        if (response.status == 201) {
                            message.success('登录成功！')
                            setAlitaState({
                                stateName: 'session_id',
                                data: response.data['session_id']
                            })
                        } else if (response.status == 404) {
                            message.error('用户名不存在!');
                        } else if (response.status == 401) {
                            message.error('用户名或密码错误，请重新输入!')
                            this.props.form.resetFields()
                        } else {
                            message.error('登录失败，请稍后重试！')
                        }
                    }).catch(r => {
                        message.error('登录失败，请稍后重试！')
                    }).finally(() => {
                        this.props.history.push('/');
                    });

            }
        });
    };

    /**
     * 渲染登录界面的布局和组件
     */
    render() {
        const { getFieldDecorator } = this.props.form;      //解析出getFieldDecorator方法
        return (
            <div className="login-container">
                <div className="login">
                    <div className="login-logo-image">
                        <img src={require('../../style/imgs/logo.png')} alt="logo" />
                        <div className="logo-text">视频云</div>
                    </div>
                    <Spin spinning={this.state.logining} delay={500}>
                        <div className="login-form-container">
                            <div className="login-form" >
                                <div className="login-logo">视频云直播管理后台</div>
                                <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: '请输入用户名!' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入密码!' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <div className="password-container">
                                            {
                                                getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true, })(
                                                    <Checkbox className="login-form-remember">记住密码</Checkbox>)
                                            }
                                            <Link to='/forget' className="login-form-forgot">忘记密码</Link>
                                        </div>
                                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                        <Link
                                            to='/register'
                                            style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <span >现在注册</span>
                                        </Link>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </Spin>
                </div>
                <div className="login-footer">
                    版权所有 © 2019 视频云管理平台
                </div>
            </div>


        );
    }
}

export default connectAlita()(withRouter(Form.create()(Login)));