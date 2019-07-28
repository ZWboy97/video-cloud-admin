import {
    Form, Input, Select, Row, Col, message, DatePicker, Icon, Upload
} from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 11 },
    },
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class LiveInfo extends React.Component {

    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        //从alitastate中解析数据
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData = {} } = live_setting_page.data || {}
        const { getFieldDecorator } = this.props.form;

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div >Upload</div>
            </div>
        );
        const { imageUrl } = this.state;

        return (
            <Row type="flex" justify="space-around" align="middle">
                <Col span={20}>
                    <div>
                        <Form className="form-style" {...formItemLayout} >
                            <Form.Item label="直播封面">
                                {getFieldDecorator('cover', {
                                })(
                                    <Row>
                                        <Col span={8}>
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={beforeUpload}
                                                onChange={this.handleChange}
                                            >
                                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                            </Upload>
                                        </Col>
                                        <Col span={15}>
                                            <div className="upload-warn-text">为了保证显示效果，请上传 140 x 140 大小的图标，
                                  支持jpg、jpeg、png格式，文件大小不超过 2M</div>
                                        </Col>
                                    </Row>
                                )}
                            </Form.Item>
                            <Form.Item label="频道号">
                                {getFieldDecorator('id', {
                                    initialValue: liveData.lid || '未知',
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(<Input disabled={true} />)}
                            </Form.Item>
                            <Form.Item label="直播名称">
                                {getFieldDecorator('name', {
                                    initialValue: liveData.name || '未知',
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="直播规模">
                                {getFieldDecorator('size', {
                                    initialValue: liveData.size || 10,
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(
                                    <Select placeholder="请选择直播规模" >
                                        <Option value={10}>最多10人</Option>
                                        <Option value={20}>最多20人</Option>
                                        <Option value={50}>最多50人</Option>
                                        <Option value={100}>最多100人</Option>
                                        <Option value={200}>最多200人</Option>
                                        <Option value={500}>最多500人</Option>
                                        <Option value={1000}>500人以上</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                            <Form.Item label="直播类型">
                                {getFieldDecorator('kind', {
                                    initialValue: liveData.kind || 1,
                                    rules: [{ required: true, message: '请输入直播频道名称' }],
                                })(
                                    <Select placeholder="请选择直播类型">
                                        <Option value={1}>普通视频直播</Option>
                                        <Option value={2}>全景视频直播</Option>
                                    </Select>,
                                )}
                            </Form.Item>

                            <Form.Item label="直播时间">
                                <RangePicker
                                    locale={locale}
                                    defaultValue={[moment(liveData.start_time, 'YYYY-MM-DD HH:mm:ss'), moment(liveData.end_time, 'YYYY-MM-DD HH:mm:ss')]}
                                    format="YYYY-MM-DD HH:mm" />
                                {getFieldDecorator('range_time', {
                                    rules: [{ type: 'array', required: true, message: '请选择您的直播时间区间' }],
                                })(
                                    <div></div>
                                )}
                            </Form.Item>
                            <Form.Item label="观看条件">
                                {getFieldDecorator('permission', {
                                    initialValue: liveData.permission || 'none',
                                    rules: [{ required: true }]
                                })(
                                    <Select placeholder="请选择直播类型">
                                        <Option value="none">公开</Option>
                                        <Option value="code">验证码</Option>
                                        <Option value="pay">支付</Option>
                                        <Option value="login">登录</Option>
                                    </Select>)}
                            </Form.Item>
                            <Form.Item label="状态">
                                <Input value={liveData.status} />
                            </Form.Item>
                            <Form.Item label="推流地址">
                                <Input value={liveData.push_url} />
                            </Form.Item>
                            <Form.Item label="HLS拉流地址">
                                <Input value={liveData.pull_hls_url} />
                            </Form.Item>
                            <Form.Item label="RTMP拉流地址">
                                <Input value={liveData.pull_rtmp_url} />
                            </Form.Item>
                            <Form.Item label="FLV拉流地址">
                                <Input value={liveData.pull_http_flv_url} />
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default connectAlita()(Form.create()(LiveInfo));
