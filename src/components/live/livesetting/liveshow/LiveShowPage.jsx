import { Row, Col, Upload, Form, Input, message, Button, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import AdSetting from './AdSetting'
import OssUploader from '../../../../utils/OssUploader';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
const { TextArea } = Input;

class LiveShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSwitchShare = this.handleSwitchShare.bind(this);
        this.handleSwitchAd = this.handleSwitchAd.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleSwitchDanmu = this.handleSwitchDanmu.bind(this);
        this.handleSwitchChat = this.handleSwitchChat.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
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
    handleSave() {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid = liveConfig.live_room_info.lid;

        const data = (({ live_pic, ad_jump_url, ad_pic_url, ad_text, advertisement, chat, danmu, share, share_text }) =>
            ({ live_pic, ad_jump_url, ad_pic_url, ad_text, advertisement, chat, danmu, share, share_text }))(liveConfig)
        const config = {
            "lid": lid,
            ...data
        }
        console.log(config)
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/config/?aid=' + user.aid, {
            ...config
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
    handleChangeText(e) {
        console.log(e.target.value)
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const data = { ...liveConfig, "share_text": e.target.value };
        this.props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });

    }
    handleSwitch(switchValue, title) {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        console.log(switchValue)
        if (switchValue === false) {

            let data = {};
            if (title === "danmu") {
                data = { ...liveConfig, "danmu": 0 };
            } else if (title === "chat") {
                data = { ...liveConfig, "chat": 0 }
            } else if (title === "share") {
                data = { ...liveConfig, "share": 0 }
            } else if (title === "advertisement") {
                data = { ...liveConfig, "advertisement": 0 }
            }

            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }
        else {
            let data = {};
            if (title === "danmu") {
                data = { ...liveConfig, "danmu": 1 };
            } else if (title === "chat") {
                data = { ...liveConfig, "chat": 1 }
            } else if (title === "share") {
                data = { ...liveConfig, "share": 1 }
            } else if (title === "advertisement") {
                data = { ...liveConfig, "advertisement": 1 }
            }

            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }

    }
    handleSwitchDanmu(switchValueDanmu) {
        this.handleSwitch(switchValueDanmu, "danmu")
    }
    handleSwitchChat(switchValueChat) {
        this.handleSwitch(switchValueChat, "chat")
    }

    handleSwitchShare(switchValueShare) {
        this.handleSwitch(switchValueShare, "share");

        console.log(switchValueShare)

    }
    handleSwitchAd(switchValueAd) {
        this.handleSwitch(switchValueAd, "advertisement")

        console.log(switchValueAd)
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
                    const { my_live_config = {} } = this.props.alitaState || {};
                    const liveConfig = my_live_config.data || {}
                    const data = { ...liveConfig, "live_pic": url };
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
    render() {

        const { getFieldDecorator } = this.props.form;
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(liveConfig.share_text)
        return (
            <div>
                <Row>
                    <Col span={10} offset={7}>
                <Form labelCol={{ span: 6}} wrapperCol={{ span: 15 }} onSubmit={this.handleOk}>
                    <Form.Item label="候场海报">
                        {getFieldDecorator('poster', {

                        })(
                            <Row>
                                <Col span={10}>
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={this.beforeUpload}
                                    >
                                        <img src={liveConfig.live_pic} alt="avatar" style={{ width: '100%' }} />
                                    </Upload>

                                </Col>
                            </Row>
                        )}
                    </Form.Item>
                    <Form.Item label="弹幕开关">
                        {getFieldDecorator('barrage', {

                        })(
                            <Switch

                                defaultChecked={liveConfig.danmu}
                                onClick={this.handleSwitchDanmu}
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="聊天开关">
                        {getFieldDecorator('talk', {

                        })(
                            <Switch

                                defaultChecked={liveConfig.chat}
                                onClick={this.handleSwitchChat}
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="分享开关">
                        {getFieldDecorator('share', {
                        })(
                            <Switch
                                defaultChecked={liveConfig.share}
                                onClick={this.handleSwitchShare}
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>

                    <div>
                        {liveConfig.share ? <div>
                            <Row>
                                <Col span={10} offset={2}>
                                    <TextArea value={liveConfig.share_text} onChange={this.handleChangeText} row={5} />
                                </Col>
                            </Row>
                            <Row>&nbsp;</Row>
                        </div> : []}
                    </div>

                    <Form.Item label="广告开关">
                        {getFieldDecorator('ad', {

                        })(
                            <Switch

                                defaultChecked={liveConfig.advertisement}
                                onClick={this.handleSwitchAd}
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>

                    <div>
                        {liveConfig.advertisement ? <Row>
                            <Col span={14}>
                                <AdSetting />
                            </Col>
                        </Row> : []}
                    </div>
                    <Row>
                        <Col span={2} offset={5}>
                            <Button type="primary" onClick={this.handleSave}>保存</Button>
                        </Col>
                    </Row>
                </Form>
                </Col>
                </Row>
            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveShowPage))