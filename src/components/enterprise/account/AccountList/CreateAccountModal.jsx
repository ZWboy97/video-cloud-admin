import React, { Component } from 'react'
import { Button, Modal, Form, Select, Input, DatePicker, message, Radio } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './style.less'
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
import { withRouter } from 'react-router-dom';
const { Option } = Select;
const { RangePicker } = DatePicker;


class CreateAccountModal extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    handleCancel() {
        this.props.setAlitaState({
            stateName: 'create_account_modal',
            data: {
                visible: false,
                loading: false
            }
        })
    }

    handleOk() {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            //读取表单数据
            const rangeTime = fieldsValue['range_time'];
            let data = {
                ...fieldsValue,
                'start_time': rangeTime[0].format('YYYY-MM-DD HH:mm:ss'),
                'end_time': rangeTime[1].format('YYYY-MM-DD HH:mm:ss')
            }
            delete data.range_time; //数据中去掉无用的字段
            console.log('data from form: ', data);
            this.setModalState(true, true);
            if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
                return;
            }
            const user = getLocalStorage('user');
            VCloudAPI.post("/com/" + user.aid + '/liverooms/', {
                aid: user.aid,
                ...data
            }).then(response => {
                if (response.status === 200) {
                    const { code = 0, data = {}, msg = {} } = response.data || {};
                    console.log(data);
                    if (code === 200) {
                        message.success('创建成功!');
                        this.props.form.resetFields();
                        this.setModalState(false, false);
                        var { my_account_list } = this.props.alitaState;
                        const { accountList } = my_account_list || {};
                        const { account_room } = data;
                        accountList.unshift(account_room);
                        // 向用户直播列表中添加一个记录
                        this.props.setAlitaState({
                            stateName: 'my_account_list',
                            data: accountList
                        });
                    } else {
                        message.error('创建失败!')
                    }
                } else {
                    message.error('网络请求失败！')
                }
            }).catch(r => {
            })
        })
    }

    setModalState(visible, loading) {
        this.props.setAlitaState({
            stateName: 'create_account_modal',
            data: {
                visible: visible,
                loading: loading
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { create_account_modal = {} } = this.props.alitaState;
        const { data } = create_account_modal;
        const { visible = false, loading = false } = data || {};

        return (
            <div>
                <Modal
                    visible={visible}
                    title="添加子账号"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            创建</Button>,
                    ]}>

                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleOk}>
                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: '请输入子账号Email' }],
                            })(<Input placeholder='请输入子账号Email' />)}
                        </Form.Item>

                        <Form.Item label="用户名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入子账号用户名' }],
                            })(<Input placeholder='请输入子账号用户名' />)}
                        </Form.Item>

                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入子账号密码' }],
                            })(<Input placeholder='请输入子账号密码' />)}
                        </Form.Item>

                        <Form.Item label="用户类型">
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '' }],
                            })(
                                <Select placeholder="选择">
                                    <Option value={10}>选择</Option>
                                    <Option value={20}>管理员</Option>
                                    <Option value={50}>操作员</Option>
                                    <Option value={100}>编辑员</Option>
                                    <Option value={200}>上传者</Option>
                                    <Option value={500}>分类者</Option>
                                </Select>,
                            )}
                        </Form.Item>

                        <Form.Item label="有效时间">
                            {getFieldDecorator('range_time', {
                                rules: [{ type: 'array', required: true, message: '请选择子账号的有效时间区间' }],
                            })(
                                <RangePicker
                                    locale={locale}
                                    showTime format="MM-DD HH:mm:ss" />,
                            )}
                        </Form.Item>

                        <Form.Item label="视频列表">
                            {getFieldDecorator('list', {
                                rules: [{ required: true, message: '' }],
                            })(
                                <Radio.Group name="radiogroup" defaultValue={1}>
                                    <Radio value={1}>只显示本账号</Radio>
                                    <Radio value={2}>全部</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(CreateAccountModal);

export default withRouter(connectAlita()(WrappedApp));
