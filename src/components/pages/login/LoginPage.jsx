/**
 *  用户登录页面
 */
import React from 'react';
import { Form, Icon, Input, Tabs, Checkbox, Spin, message, Layout } from 'antd';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../../axios/api';
import { Link, withRouter } from 'react-router-dom';
import { setLocalStorage, getUrlParams } from '../../../utils/index';
import EmailLogin from "./EmailLogin"
import MobileLogin from "./MobileLogin"
const { TabPane } = Tabs;
const FormItem = Form.Item;

class LoginPage extends React.Component {

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

    callback(key) {
        console.log(key);
    }

    /**
     * 渲染登录界面的布局和组件
     */
    render() {
        // const { getFieldDecorator } = this.props.form;      //解析出getFieldDecorator方法
        return (
            <div className="login-container">
                <div className="login">
                    <div className="login-logo-image">
                        <img src={require('../../../style/imgs/logo.png')} alt="logo" />
                        <div className="logo-text">视频云</div>
                    </div>
                    <Spin spinning={this.state.logining} delay={500}>
                        <div className="login-form-container">
                            <div className="login-form" >
                                <div className="login-logo">视频云直播管理后台</div>
                                
                                <Tabs className="tab-form" defaultActiveKey="1" onChange={this.callback} tabPosition={'top'}>
                                    <TabPane tab="&nbsp;&nbsp;&nbsp;&nbsp;邮箱登陆&nbsp;&nbsp;&nbsp;&nbsp;" key="1">
                                        <EmailLogin />
                                    </TabPane>
                                    <TabPane tab="&nbsp;&nbsp;&nbsp;&nbsp;手机登陆&nbsp;&nbsp;&nbsp;&nbsp; " key="2">
                                        <MobileLogin />
                                    </TabPane>
                                </Tabs>
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

export default connectAlita()(withRouter(Form.create()(LoginPage)));