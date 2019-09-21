/**
 *  用户登录页面
 */
import React from 'react';
import { Form, Icon, Input, Button, Tooltip, Row, message, Col } from 'antd';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from './../../../axios/api';
import { Link, withRouter } from 'react-router-dom';
import { setLocalStorage, getUrlParams } from './../../../utils/index';

const FormItem = Form.Item;

class EmailRegister extends React.Component {

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
    handleGetCode=e=>{
        e.preventDefault();
        const email=this.props.form.getFieldValue("email")
           
                VCloudAPI.post('/user/email/',
                    {
                        email: email,
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
                VCloudAPI.post('/user/register/email/?cvcode='+values.cvcode,
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
                            } else if(data.code === 408){
                                message.info('验证码已失效');
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

    /**
     * 渲染登录界面的布局和组件
     */
    render() {
        const { getFieldDecorator } = this.props.form;      //解析出getFieldDecorator方法
        return (

            <div>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={this.handleSubmit}>
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
                                <Form.Item label="验证码" >
                                    {getFieldDecorator('cvcode', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入验证码',
                                            },
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
                                
                                    
                                        <div className="button-layout">
                                    <Button className="register-button" type="primary" htmlType="submit">
                                        注册 </Button>
                                    
                                        </div>
                                        <div className="button-layout">
                                    <Link
                                        to='/login'>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<u>?已有账号，去登陆</u>
                                        </Link>
                                        </div>
                                
                            </Form>

            </div>


        );
    }
}

export default connectAlita()(withRouter(Form.create()(EmailRegister)));