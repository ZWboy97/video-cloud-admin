import React, { Component } from 'react'
import { Button, Modal, Form, Select, Input, DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './style.less'
import { connectAlita } from 'redux-alita';

const { Option } = Select;
const { RangePicker } = DatePicker;


class CreateLiveModal extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    handleCancel() {
        this.props.setAlitaState({
            stateName: 'create_live_modal',
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
            this.props.setAlitaState({
                stateName: 'create_live_modal',
                data: {
                    visible: true,
                    loading: true
                }
            })
            //todu 读取输入的数据
        })


    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log('alitastate', this.props.alitaState)
        const { create_live_modal = {} } = this.props.alitaState;
        const { data } = create_live_modal;
        const { visible = false, loading = false } = data || {};

        return (
            <div>
                <Modal
                    visible={visible}
                    title="创建新的直播频道"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            创建</Button>,
                    ]}
                >

                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleOk}>

                        <Form.Item label="频道名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入直播频道名称' }],
                            })(<Input placeholder='请输入直播频道名称' />)}
                        </Form.Item>

                        <Form.Item label="直播规模">
                            {getFieldDecorator('size', {
                                rules: [{ required: true, message: '请选择直播规模' }],
                            })(
                                <Select placeholder="请选择直播规模">
                                    <Option value="10">最多10人</Option>
                                    <Option value="20">最多20人</Option>
                                    <Option value="50">最多50人</Option>
                                    <Option value="100">最多100人</Option>
                                    <Option value="200">最多200人</Option>
                                    <Option value="500">最多500人</Option>
                                    <Option value="1000">500人以上</Option>
                                </Select>,
                            )}
                        </Form.Item>

                        <Form.Item label="直播类型">
                            {getFieldDecorator('kind', {
                                rules: [{ required: true, message: '请选择直播类型' }],
                            })(
                                <Select placeholder="请选择直播类型">
                                    <Option value="normal">普通视频直播</Option>
                                    <Option value="panoramic">全景视频直播</Option>
                                </Select>,
                            )}
                        </Form.Item>

                        <Form.Item label="直播时间">
                            {getFieldDecorator('range_time', {
                                rules: [{ type: 'array', required: true, message: '请选择您的直播时间区间' }],
                            })(
                                <RangePicker
                                    locale={locale}
                                    showTime format="MM-DD HH:mm:ss" />,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(CreateLiveModal);


export default connectAlita()(WrappedApp);