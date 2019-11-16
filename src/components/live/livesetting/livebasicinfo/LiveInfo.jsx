import {
    Form, Input, Select, Row, Col, message, DatePicker, Icon, Upload
} from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import OssUploader from '../../../../utils/OssUploader';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';

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


class LiveInfo extends React.Component {

    componentDidMount(){
        VCloudAPI.get('sts/token').then(res => {
            console.log(res)
            this.options.config.accessKeySecret = res.data.AccessKeySecret
            this.options.config.accessKeyId = res.data.AccessKeyId
            this.options.config.stsToken = res.data.SecurityToken
            console.log('options', this.options)
        })
    }
    options = {
        config: {
            region: 'oss-cn-beijing',
            accessKeyId: "",
            accessKeySecret: "",
            stsToken: "",
            bucket: 'video-cloud-bupt',
        },
        dirname: '',
        progress: (percent) => {
            console.log('上传进度:', parseInt(percent * 100));
        }
    }
    beforeUpload = file => {
        console.log('beforeuploascover');

        console.log('上传文件名', file.name);
        console.log(file.size);
        //const video_type=file.name.substring(file.name.indexOf('.'),file.name.length);
        // 创建Uploader
        const upload = new OssUploader({
            ...this.options,//与文件无关的一些配置
            file,// 待上传的文件
        });
        console.log('options', this.options)
        // 开始上传
        upload.start(
            res => {
                console.log('OSS上传返回结果', res)
                if (res.res.status === 200) {
                    message.success('文件上传成功');
                    const url = res.res.requestUrls[0].substring(0, res.res.requestUrls[0].indexOf('?'));
                    console.log('上传文件的返回URL为', url);
                    const { live_setting_page = {} } = this.props.alitaState || {};
                    const { liveData = {} } = live_setting_page.data || {}
                    const data = { liveData: { ...liveData, "picture_url": url } }
                    this.props.setAlitaState({
                        stateName: 'live_setting_page',
                        data: data
                    });
                } else {
                    message.error('文件上传失败');
                }
            },
            error => {
                message.error('文件上传失败');
            }
        );
        return false;// 在这里，我们自己通过OSS上传，所以返回false，拦截Upload自己的上传
    }
    render() {
        //从alitastate中解析数据
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData = {} } = live_setting_page.data || {}
        console.log(liveData)
        const { getFieldDecorator } = this.props.form;
        console.log(liveData.picture_url)

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
                                                beforeUpload={this.beforeUpload}
                                                showUploadList={false}
                                            >
                                                <img src={liveData.picture_url} alt="avatar" style={{ width: '100%' }} />
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

                                <Input value={liveData.lid} />
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

                                {getFieldDecorator('range_time', {
                                    rules: [{ type: 'array', required: true, message: '请选择您的直播时间区间' }],
                                })(
                                    <RangePicker
                                        locale={locale}
                                        //defaultValue={[moment(liveData.start_time, 'YYYY-MM-DD HH:mm:ss'), moment(liveData.end_time, 'YYYY-MM-DD HH:mm:ss')]}
                                        format="YYYY-MM-DD HH:mm" />
                                )}
                            </Form.Item>
                            <Form.Item label="观看条件">
                                {getFieldDecorator('permission', {
                                    initialValue: liveData.permission || 'none',
                                    rules: [{ required: true }]
                                })(
                                    <Select placeholder="请选择直播类型">
                                        <Option value={1}>公开</Option>
                                        <Option value={2}>验证码</Option>
                                        <Option value={3}>支付</Option>
                                        <Option value={4}>登录</Option>
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
export default connectAlita()(Form.create(
    {
        onValuesChange(props, changedValues, allValues) {
            console.log(allValues);
            const { live_setting_page = {} } = props.alitaState || {};
            const { liveData = {} } = live_setting_page.data || {}
            console.log(changedValues)
            if (changedValues.hasOwnProperty('range_time')) {
                const changedRange = {
                    'start_time': changedValues.range_time[0].format('YYYY-MM-DD HH:mm:ss'),
                    'end_time': changedValues.range_time[1].format('YYYY-MM-DD HH:mm:ss')
                };
                console.log(changedRange)
                const data = { liveData: { ...liveData, ...changedRange } }
                console.log(data)
                props.setAlitaState({
                    stateName: 'live_setting_page',
                    data: data
                });
            }
            else if (changedValues.hasOwnProperty('cover')) { }
            else {
                const data = { liveData: { ...liveData, ...changedValues } }
                console.log(data)
                props.setAlitaState({
                    stateName: 'live_setting_page',
                    data: data
                });
            }

        }
    })(LiveInfo));
