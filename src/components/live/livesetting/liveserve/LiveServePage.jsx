import { Row, Col, Checkbox, Select, Form, Button, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
//import { VCloudAPI } from '../../../axios/api';

const { Option } = Select;
class LiveServePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSwitchTran = this.handleSwitchTran.bind(this);
        this.handleSwitchRecord = this.handleSwitchRecord.bind(this);
        this.handleSwitchDelay = this.handleSwitchDelay.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleCheck=this.handleCheck.bind(this);
        this.handleSelect=this.handleSelect.bind(this)
        this.handleSave=this.handleSave.bind(this);

    }
    handleSave(){
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid;

        const data = (({delay,transcode,transcode_type,record,record_type}) => 
        ({delay,transcode,transcode_type,record,record_type}))(liveConfig)
        const config={
            "lid":lid,
            ...data
        }
        console.log(config)
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/quality/?aid=' + user.aid, {
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
    handleSelect(optionValue){
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const data={...liveConfig,"record_type":optionValue}
        this.props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });

    }
    handleCheck(checkedList){

        console.log(checkedList)
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const data={...liveConfig,"transcode_type":checkedList}
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
            if (title === "delay") {
                data = { ...liveConfig, "delay": 0 };
            } else if (title === "transcode") {
                data = { ...liveConfig, "transcode": 0 }
            } else if (title === "record") {
                data = { ...liveConfig, "record": 0 }
            }

            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }
        else {
            let data = {};
            if (title === "delay") {
                data = { ...liveConfig, "delay": 1 };
            } else if (title === "transcode") {
                data = { ...liveConfig, "transcode": 1 }
            } else if (title === "record") {
                data = { ...liveConfig, "record": 1}
            }

            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }

    }

    handleSwitchDelay(switchValueDelay) {
        this.handleSwitch(switchValueDelay, "delay")
    }
    handleSwitchTran(switchValueTran) {
        this.handleSwitch(switchValueTran, "transcode")
    }
    handleSwitchRecord(switchValueRecord) {
        this.handleSwitch(switchValueRecord, "record")
    }
   
    render() {

        const { getFieldDecorator } = this.props.form;

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(liveConfig.transcode_type)

        return (
            <div>

                <Form labelCol={{ span: 2 }} wrapperCol={{ span: 15 }}>
                    <Form.Item label="低时延">
                        {getFieldDecorator('delay', {

                        })(
                            <div >
                                <Switch
                                    defaultChecked={liveConfig.delay}
                                    onClick={this.handleSwitchDelay}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="转码">
                        {getFieldDecorator('transcode', {

                        })(
                            <div>
                                <Switch

                                    defaultChecked={liveConfig.transcode}
                                    onClick={this.handleSwitchTran}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {liveConfig.transcode ? <div>
                            <Row>
                                <Col span={10} offset={4}>
                                    <Checkbox.Group defaultValue={liveConfig.transcode_type} onChange={this.handleCheck}>
                                        <Checkbox value={1}>1080p</Checkbox>
                                        <Checkbox value={2}>720p</Checkbox>
                                        <Checkbox value={3}>480p</Checkbox>
                                        <Checkbox value={4}>120p</Checkbox>
                                    </Checkbox.Group>
                                </Col>
                            </Row>
                            <Row >&nbsp;</Row>
                        </div> : []}
                    </div>

                    <Form.Item label="录制">
                        {getFieldDecorator('record', {

                        })(
                            <div>
                                <Switch

                                    defaultChecked={liveConfig.record}
                                    onClick={this.handleSwitchRecord}
                                    checkedChildren={"开启"}
                                    unCheckedChildren={"关闭"}
                                />
                            </div>
                        )}
                    </Form.Item>

                    <div>
                        {liveConfig.record?<div>
                    <Row>
                        <Col span={6} offset={4}>
                            <Select defaultValue="lucy" onChange={this.handleSelect}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row >&nbsp;</Row>

                </div>:[]}
                    </div>
                    <Button type="primary" onClick={this.handleSave}>保存</Button>

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