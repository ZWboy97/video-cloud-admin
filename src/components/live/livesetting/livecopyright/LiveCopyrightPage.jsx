import { Row, Col, Form, Switch, Divider } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import LogoSetting from './LogoSetting';
import LampSetting from './LampSetting';
//import { VCloudAPI } from '../../../axios/api';

class LiveCopyrightPage extends React.Component {
    constructor(props){
        super(props);
        this.handleSwitchLogo=this.handleSwitchLogo.bind(this);
        this.handleSwitchLamp=this.handleSwitchLamp.bind(this);
    }


    handleSwitchLogo(switchValueLogo) {
        const { copyright_set = {} } = this.props.alitaState;
        const { data } = copyright_set;
        

        console.log(switchValueLogo)
        if (switchValueLogo === false) {
            const logoContent = [];
            this.props.setAlitaState({
                stateName: 'copyright_set',
                data: {
                    ...data,
                    logoContent: logoContent
                }

            });

        }
        else {
            const logoContent = (
                <Row>
                    <Col span={17} offset={3}>
                <LogoSetting />
                </Col>
                </Row>
            );
            this.props.setAlitaState({
                stateName: 'copyright_set',
                data: {
                    ...data,
                    logoContent: logoContent
                }

            });
        }

    }
    handleSwitchLamp(switchValueLamp){
        const { copyright_set = {} } = this.props.alitaState;
        const { data } = copyright_set;

        console.log(switchValueLamp)
        if (switchValueLamp === false) {
            const lampContent = [];
            this.props.setAlitaState({
                stateName: 'copyright_set',
                data: {
                    ...data,
                    lampContent: lampContent
                }

            });

        }
        else {
            const lampContent = (
                <Row>
                <Col span={17} offset={3}>
            <LampSetting />
            </Col>
            </Row>
            )
            this.props.setAlitaState({
                stateName: 'copyright_set',
                data: {
                    ...data,
                    lampContent: lampContent
                }

            });
        }

    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { copyright_set = {} } = this.props.alitaState;
        const { data } = copyright_set;
        const { logoContent = [], lampContent = [] } = data || {};

        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 15 }} onSubmit={this.handleOk}>
                    <Form.Item label="logo">
                        {getFieldDecorator('logo', {
                        })(
                            <div>
                                <Switch
                                    defaultChecked={false}
                                    onClick={this.handleSwitchLogo}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {logoContent}
                    </div>
                    <Divider />

                    <Form.Item label="防录屏跑马灯">
                        {getFieldDecorator('lamp', {

                        })(
                            <div>
                                <Switch

                                    defaultChecked={false}
                                    onClick={this.handleSwitchLamp}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {lampContent}
                    </div>

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveCopyrightPage))