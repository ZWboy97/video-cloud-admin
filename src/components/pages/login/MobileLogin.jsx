/**
 *  用户登录页面
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, message, Col } from 'antd';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../../axios/api';
import { Link, withRouter } from 'react-router-dom';
import { setLocalStorage, getUrlParams } from '../../../utils/index';

const FormItem = Form.Item;

class MobileLogin extends React.Component {

    //控制的state，不从Redux中读取
    state = {
        logining: false,
        redirect: ''
    }

    componentWillMount() {
        document.title = '登录-视频云管理平台';
        const { redirect } = getUrlParams();
        if (redirect) {
            this.setState({
                redirect: redirect  //从url读取参数，跳转来源（登录成功后要成功回去），为空的话就跳转到根首页
            });
        }
    }

    /**
     * 处理用户点击登录按钮
     */
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                VCloudAPI.post('/user/login',
                    {
                        email: values.email,
                        passWord: values.password
                    })
                    .then(response => {
                        const { code = 0, data = {}, msg = {} } = response.data || {};
                        if (code === 201) {
                            message.success('登录成功！')
                            setLocalStorage('session_id', data.session_id);
                            setLocalStorage('user', data.user);
                            if (this.state.redirect === '') {
                                this.props.history.push('/');
                            } else {
                                this.props.history.push(this.state.redirect);   //登录成功之后，跳转回之前的界面
                            }
                        } else if (code === 401) {
                            message.error('用户名或密码错误，请重新输入!')
                            this.props.form.resetFields()
                        }
                    })

            }
        });
    };

    /**
     * 渲染登录界面的布局和组件
     */
    render() {
        const { getFieldDecorator } = this.props.form;      //解析出getFieldDecorator方法
        return (

            <div>
                <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入手机号码!' }],
                        })(
                            <Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} type="mobile" placeholder="登录手机号" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <div className="verify-code">
                    <Row>
                    <Col span={6}>
                    <img src={require("./../../../style/imgs/verifyCode.png")} alt="avatar" style={{ width: '100%', }} />
                            </Col>
                            <Col span={5} offset={1}>
                            <div className="text-bottom"><a href="javascript:;"><u >换一张</u></a></div>
                            </Col>
                        <Col span={11} offset={1}>
                        <Input prefix={<Icon type="key" style={{ fontSize: 13 }} />} placeholder="验证码" />
                            </Col>   
                        </Row>
                        </div>
                    <FormItem>
                        <div className="password-container">
                            {
                                getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true, })(
                                    <Checkbox className="login-form-remember">记住密码</Checkbox>)
                            }
                            <Link to='/forget' className="login-form-forgot"><u>忘记密码</u></Link>
                        </div>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                        <Link
                            to='/register'
                            style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <u >现在注册</u>
                        </Link>
                    </FormItem>
                </Form>

            </div>


        );
    }
}

export default connectAlita()(withRouter(Form.create()(MobileLogin)));