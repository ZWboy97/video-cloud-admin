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
    handleSave() {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid;

        const data = (({live_pic,ad_jump_url,ad_pic_url,ad_text,advertisement,chat,danmu,share,share_text}) => 
        ({live_pic,ad_jump_url,ad_pic_url,ad_text,advertisement,chat,danmu,share,share_text}))(liveConfig)
        const config={
            "lid":lid,
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
        // 配置STS Token， 之后需要从STS服务器去取
        const options = {
            config: {
                region: 'oss-cn-beijing',
                accessKeyId: "STS.NHzCXAWswMA6UhUVMWBkxcNP4",
                accessKeySecret: "9WBs9RAL4ioo48xf17au4k4pxK57FsKkNhEGi672e95i",
                stsToken: "CAISkwJ1q6Ft5B2yfSjIr4vPCOL1uqxW+oPdV07ksk0CTuRUjIv71jz2IH1KeHBsAugctvw/mmFX7PgSlqB6T55OSAmcNZIoS2+qPq3kMeT7oMWQweEuuv/MQBquaXPS2MvVfJ+OLrf0ceusbFbpjzJ6xaCAGxypQ12iN+/m6/Ngdc9FHHP7D1x8CcxROxFppeIDKHLVLozNCBPxhXfKB0ca3WgZgGhku6Ok2Z/euFiMzn+Ck7dL99mgfsT1MJE8Yc8jD+3YhrImKvDztwdL8AVP+atMi6hJxCzKpNn1ASMKvkvaaraPqoc3dF8nN/dgRf5e3/H4lOxlvOvIjJjwyBtLMuxTXj7WWIe62szAFfM14h+KhSJhUhqAAYlpjDY6CbeFKJT0L8T47wsPEm9QPtSUf5/1Mgyqk58HhyymtTPgcK3yX7Mp7qUOa6cu21UUMfLEKqY6ZlLy74NNpiY5x8iI9Py4LIYoRJNpuJJOl6QR/s5DSGiXDupTDkuyH8PgYVu1qmjRxAVQuFH5WWhUHQ4TynjZsbY/U63J",
                bucket: 'pic-cloud-bupt',
            },
            dirname: '',
            progress: this.progress,

        }
        // 创建Uploader
        const upload = new OssUploader({
            ...options,                 // 与文件无关的一些配置
            file,                       // 待上传的文件
        });
        // 开始上传
        upload.start(
            res => {
                console.log('OSS上传返回结果', res)
                if (res.res.status === 200) {
                    message.success('文件上传成功');
                    const url = res.res.requestUrls[0];
                    const { my_live_config = {} } = this.props.alitaState || {};
                    const liveConfig = my_live_config.data || {}
                    const data = { ...liveConfig, "live_pic": url };
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
                        data: data
                    });
                    console.log('上传文件的返回URL为', url);
                } else {
                    message.error('文件上传失败');
                }
            },
            error => {
                message.error('文件上传失败');
            }
        );
        return false;       // 在这里，我们自己通过OSS上传，所以返回false，拦截Upload自己的上传
    }

    progress = (percent) => {
        console.log('上传进度:', parseInt(percent * 100));
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(liveConfig.share_text)
        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} onSubmit={this.handleOk}>
                    <Form.Item label="候场海报">
                        {getFieldDecorator('poster', {

                        })(
                            <Row>
                                <Col span={6}>
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
                                <Col span={2} offset={4}>
                                    <div>&nbsp;分享文本：</div>
                                </Col>
                                <Col span={8} >
                                    <TextArea value={liveConfig.share_text} onChange={this.handleChangeText} row={5} />
                                </Col>
                            </Row>
                            <Row>&nbsp;</Row>
                        </div>:[]}
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
                            <Col span={14} offset={3}>
                                <AdSetting />
                            </Col>
                        </Row> : []}
                    </div>
                    <Button type="primary" onClick={this.handleSave}>保存</Button>
                </Form>
            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveShowPage))