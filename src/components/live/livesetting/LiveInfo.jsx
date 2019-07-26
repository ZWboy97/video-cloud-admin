import {
    Form, Input, Select, Row, Col, message, DatePicker
} from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../../axios/api';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Link } from 'react-router-dom';
import moment from 'moment';
class LiveInfo extends React.Component {


    render() {
        const { Option } = Select;
        const { RangePicker } = DatePicker;

        console.log('1')
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        console.log('2')
        const { getFieldDecorator } = this.props.form;
        console.log('3')
        const { edit_info = {} } = this.props.alitaState;
        const { data } = edit_info;
        const { disable=true, button_value = 1 } = data || {};

        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col span="20">
                    <div>
                        <Form className="form-style" {...formItemLayout} >
                            <Form.Item label="频道号">
                                {getFieldDecorator('id', {
                                    initialValue: 123456,
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(<Input disabled={true}/>)}
                            </Form.Item>
                            <Form.Item label="直播名称">
                                {getFieldDecorator('name', {
                                    initialValue: "第一个直播",
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(<Input disabled={disable}/>)}
                            </Form.Item>
                            <Form.Item label="直播规模">
                                {getFieldDecorator('size', {
                                    initialValue: "10",
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(
                                    <Select placeholder="请选择直播规模" disabled={disable}>
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
                                    initialValue: "normal",
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(
                                    <Select disabled={disable} placeholder="请选择直播类型">
                                        <Option value="normal">普通视频直播</Option>
                                        <Option value="panoramic">全景视频直播</Option>
                                    </Select>,
                                )}
                            </Form.Item>

                            <Form.Item label="直播时间">
                                {getFieldDecorator('range_time', {
                                    //initialValue: "1230",
                                    defaultValue: [moment('2019-09-03 11:11:11','YYYY-MM-DD HH:mm:ss'),moment('2019-09-03 12:11:11','YYYY-MM-DD HH:mm:ss')],
                                    rules: [{ type: 'array', required: true, message: '请选择您的直播时间区间' }],
                                })(
                                    <RangePicker 
                                        disabled={disable}
                                        locale={locale}
                                        showTime format="MM-DD HH:mm:ss" />
                                )}
                            </Form.Item>
                            <Form.Item label="观看条件">
                                {getFieldDecorator('email', {
                                    initialValue: 'all'
                                })(
                                <Select disabled={disable} placeholder="请选择直播类型">
                                <Option value="all">所有人</Option>
                                <Option value="vip">会员</Option>
                            </Select>,)}
                            </Form.Item>
                            <Form.Item label="状态">
                                {getFieldDecorator('status', {
                                    initialValue: "未进行"
                                })(<Input disabled={true}/>)}
                            </Form.Item>
                            <Form.Item label="推流地址">
                                {getFieldDecorator('push', {
                                    initialValue: "http://wdwedwec"
                                })(<Input disabled={true}/>)}
                            </Form.Item>
                            <Form.Item label="拉流地址">
                                {getFieldDecorator('pull_hls', {
                                    initialValue: "hls:sfdwefawef"
                                })(<Input disabled={true}/>)}
                            </Form.Item>
                            <Form.Item label="拉流地址">
                                {getFieldDecorator('pull_rtmp', {
                                    initialValue: 'rtmp:wfwe'
                                })(<Input disabled={true}/>)}
                            </Form.Item>
                            <Form.Item label="拉流地址">
                                {getFieldDecorator('pull_https', {
                                    initialValue: 'https:sdfaweaf'
                                })(<Input disabled={true}/>)}
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default connectAlita()(Form.create()(LiveInfo));
