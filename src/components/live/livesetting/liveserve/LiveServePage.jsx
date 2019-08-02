import { Row, Col, Checkbox, Select, Form, Input, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';

const { Option } = Select;
class LiveServePage extends React.Component {
    constructor(props){
        super(props);
        this.handleSwitchTran=this.handleSwitchTran.bind(this);
        this.handleSwitchRecord=this.handleSwitchRecord.bind(this);
    }


    handleSwitchTran(switchValueTran) {
        const { intro_serve_set = {} } = this.props.alitaState;
        const { data } = intro_serve_set;
        

        console.log(switchValueTran)
        if (switchValueTran === false) {
            const transSelect = [];
            this.props.setAlitaState({
                stateName: 'intro_serve_set',
                data: {
                    ...data,
                    transSelect: transSelect
                }

            });

        }
        else {
            const transSelect = (
                <div>
                    <Row>
                        <Col span={10} offset={4}>
                            <Checkbox.Group >
                                <Checkbox value="A">1080p</Checkbox>
                                <Checkbox value="B">720p</Checkbox>
                                <Checkbox value="C">480p</Checkbox>
                                <Checkbox value="D">120p</Checkbox>
                            </Checkbox.Group>
                        </Col>
                    </Row>
                    <Row >&nbsp;</Row>
                </div>
            );
            this.props.setAlitaState({
                stateName: 'intro_serve_set',
                data: {
                    ...data,
                    transSelect: transSelect
                }

            });
        }

    }
    handleSwitchRecord(switchValueRecord){
        const { intro_serve_set = {} } = this.props.alitaState;
        const { data } = intro_serve_set;

        console.log(switchValueRecord)
        if (switchValueRecord === false) {
            const recordSelect = [];
            this.props.setAlitaState({
                stateName: 'intro_serve_set',
                data: {
                    ...data,
                    recordSelect: recordSelect
                }

            });

        }
        else {
            const recordSelect = (
                <div>
                    <Row>
                        <Col span={6} offset={4}>
                            <Select defaultValue="lucy" >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row >&nbsp;</Row>

                </div>
            )
            this.props.setAlitaState({
                stateName: 'intro_serve_set',
                data: {
                    ...data,
                    recordSelect: recordSelect
                }

            });
        }

    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { intro_serve_set = {} } = this.props.alitaState;
        const { data } = intro_serve_set;
        const { transSelect = [], recordSelect = [] } = data || {};

        return (
            <div>

                <Form labelCol={{ span: 2 }} wrapperCol={{ span: 15 }} onSubmit={this.handleOk}>



                    <Form.Item label="低时延">
                        {getFieldDecorator('delay', {

                        })(
                            <div >
                                <Switch
                                    defaultChecked={false}
                                    //onClick={this.handleSwitch}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="转码">
                        {getFieldDecorator('transCode', {

                        })(
                            <div>
                                <Switch

                                    defaultChecked={false}
                                    onClick={this.handleSwitchTran}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {transSelect}
                    </div>

                    <Form.Item label="录制">
                        {getFieldDecorator('record', {

                        })(
                            <div>
                                <Switch

                                    defaultChecked={false}
                                    onClick={this.handleSwitchRecord}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {recordSelect}
                    </div>

                    <Form.Item label="导播">
                        {getFieldDecorator('lead', {

                        })(
                            <div >
                                <a href="javascript:;" >进入导播台</a>
                            </div>
                        )}
                    </Form.Item>

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveServePage))