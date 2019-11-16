import { Row, Col, Button, Upload, Form, Input, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
import OssUploader from '../../../../utils/OssUploader';

class LiveIntroSet extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
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
                    const { my_live_config = {} } = this.props.alitaState || {};
                    const liveConfig = my_live_config.data || {}
                    const data = { ...liveConfig, "pre_pic": url };
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
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

    handleSwitch = (switchValue) => {

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(switchValue)
        if (switchValue === false) {

            const data = { ...liveConfig, "qorder": 0 };
            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }
        else {
            const data = { ...liveConfig, "qorder": 1 };
            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });
        }

    }
    handleSave() {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid
        const data = {
            "lid":lid,
            "pre_pic": liveConfig.pre_pic,
            "qorder": liveConfig.qorder
        }
        console.log(data)
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/intro/?aid=' + user.aid, {
            ...data
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                if (code === 200) {
                    message.success('修改成功!');

                } else {
                    message.error('修改失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        return (
            <div>

                <Form className="content-padding" labelCol={{ span: 10 }} wrapperCol={{ span: 8 }} onSubmit={this.handleOk}>
                    <Row>
                        <Col span={15}>
                            <Form.Item label="引导页图片">
                                {getFieldDecorator('pre_pic', {

                                })(
                                    
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {<img src={liveConfig.pre_pic} alt="avatar" style={{ width: '100%' }} />}
                                    </Upload>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <div className="text-style">为了保证显示效果，请上传 750 x 1334 大小的图片，支持jpg、jpeg、
png格式，大小不超过 2M</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={15}>
                            <Form.Item label="是否需要预约">
                                {getFieldDecorator('qorder', {

                                })(
                                    <div>
                                        <Switch
                                            defaultChecked={liveConfig.qorder}
                                            onClick={this.handleSwitch}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </div>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>


                    <div className="save-button">
                        <Button
                            onClick={this.handleSave}
                            type="primary"
                        >保存</Button>
                    </div>
                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveIntroSet))