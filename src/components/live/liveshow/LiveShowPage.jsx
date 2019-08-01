import { Row, Col, Upload, Form, Input, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import AdSetting from './AdSetting'
//import { VCloudAPI } from '../../../axios/api';

const {TextArea}=Input;

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

class LiveShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSwitchShare = this.handleSwitchShare.bind(this);
        this.handleSwitchAd = this.handleSwitchAd.bind(this);
    }

    state = {
        loading: false,
    };
    handleSwitchShare(switchValueShare) {
        const { show_switch_content = {} } = this.props.alitaState;
        const { data } = show_switch_content;


        console.log(switchValueShare)
        if (switchValueShare === false) {
            const shareContent = [];
            this.props.setAlitaState({
                stateName: 'show_switch_content',
                data: {
                    ...data,
                    shareContent: shareContent
                }

            });

        }
        else {
            const shareContent = (
                <div>
                    <Row>
                        <Col span={2} offset={4}>
                            <div>&nbsp;分享文本：</div>
                        </Col>
                        <Col span={8} >
                            <TextArea row={5} />
                        </Col>
                    </Row>
                    <Row>&nbsp;</Row>
                </div>
            );
            this.props.setAlitaState({
                stateName: 'show_switch_content',
                data: {
                    ...data,
                    shareContent: shareContent
                }

            });
        }

    }
    handleSwitchAd(switchValueAd) {
        const { show_switch_content = {} } = this.props.alitaState;
        const { data } = show_switch_content;

        console.log(switchValueAd)
        if (switchValueAd === false) {
            const adContent = [];
            this.props.setAlitaState({
                stateName: 'show_switch_content',
                data: {
                    ...data,
                    adContent: adContent
                }

            });

        }
        else {
            const adContent = (
                <Row>
                    <Col span={14} offset={3}>
                        <AdSetting />
                    </Col>
                </Row>
            )
            this.props.setAlitaState({
                stateName: 'show_switch_content',
                data: {
                    ...data,
                    adContent: adContent
                }

            });
        }

    }



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

        const { getFieldDecorator } = this.props.form;
        const { show_switch_content = {} } = this.props.alitaState;
        const { data } = show_switch_content;
        const { shareContent = [], adContent = [] } = data || {};

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div >Upload</div>
            </div>
        );
        const { imageUrl } = this.state;

        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} onSubmit={this.handleOk}>
                    <Form.Item label="候场海报">
                        {getFieldDecorator('poster', {

                        })(
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
                        )}
                    </Form.Item>
                    <Form.Item label="弹幕开关">
                        {getFieldDecorator('barrage', {

                        })(
                            <Switch

                                defaultChecked
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="聊天开关">
                        {getFieldDecorator('talk', {

                        })(
                            <Switch

                                defaultChecked
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="分享开关">
                        {getFieldDecorator('share', {
                        })(
                            <Switch
                                defaultChecked={false}
                                onClick={this.handleSwitchShare}
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>

                    <div>
                        {shareContent}
                    </div>

                    <Form.Item label="广告开关">
                        {getFieldDecorator('ad', {

                        })(
                            <Switch

                                defaultChecked={false}
                                onClick={this.handleSwitchAd}
                                checkedChildren={"开启"}
                                unCheckedChildren={"关闭"}
                            />
                        )}
                    </Form.Item>

                    <div>
                        {adContent}
                    </div>

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveShowPage))