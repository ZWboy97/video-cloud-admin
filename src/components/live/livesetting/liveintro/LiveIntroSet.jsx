import { Row, Col, Button, Upload, Form, Input, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
import OssUploader from '../../../../utils/OssUploader';
//import { VCloudAPI } from '../../../axios/api';


class LiveIntroSet extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
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
                    const data = { ...liveConfig, "pre_pic": url };
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