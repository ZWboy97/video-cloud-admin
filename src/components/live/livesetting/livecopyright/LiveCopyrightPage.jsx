import { Row, Col, Form, Switch, Divider,Button,message } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import LogoSetting from './LogoSetting';
import LampSetting from './LampSetting';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';

class LiveCopyrightPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSwitchLogo = this.handleSwitchLogo.bind(this);
        this.handleSwitchLamp = this.handleSwitchLamp.bind(this);
        this.handleSave=this.handleSave.bind(this)
    }

    handleSave(){
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid;

        const data = (({logo,logo_url,logo_position,logo_transparency,lamp,lamp_type,lamp_text,lamp_font_size,lamp_transparency}) => 
        ({logo,logo_url,logo_position,logo_transparency,lamp,lamp_type,lamp_text,lamp_font_size,lamp_transparency}))(liveConfig)
        const config={
            "lid":lid,
            ...data
        }
        console.log(config)
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/safe/?aid=' + user.aid, {
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


    handleSwitchLogo(switchValueLogo) {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(switchValueLogo)

        let data = {};

        if (switchValueLogo === false) {
            data = { ...liveConfig, "logo": 0 };
        }
        else {
            data = { ...liveConfig, "logo": 1 };
        }
        this.props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });

    }
    handleSwitchLamp(switchValueLamp) {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(switchValueLamp)

        let data = {};

        if (switchValueLamp === false) {
            data = { ...liveConfig, "lamp": 0 };
        }
        else {
            data = { ...liveConfig, "lamp": 1 };
        }
        this.props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });

    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} onSubmit={this.handleOk}>
                    <Form.Item label="logo">
                        {getFieldDecorator('logo', {
                        })(
                            <div>
                                <Switch
                                    defaultChecked={liveConfig.logo}
                                    onClick={this.handleSwitchLogo}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {liveConfig.logo ? <Row>
                            <Col span={17} offset={3}>
                                <LogoSetting />
                            </Col>
                        </Row> : []}
                    </div>
                    <Divider />

                    <Form.Item label="防录屏跑马灯">
                        {getFieldDecorator('lamp', {

                        })(
                            <div>
                                <Switch

                                    defaultChecked={liveConfig.lamp}
                                    onClick={this.handleSwitchLamp}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {liveConfig.lamp ? <Row>
                            <Col span={17} offset={3}>
                                <LampSetting />
                            </Col>
                        </Row> : []}
                    </div>
                    <Button type="primary" onClick={this.handleSave}>保存</Button>

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveCopyrightPage))