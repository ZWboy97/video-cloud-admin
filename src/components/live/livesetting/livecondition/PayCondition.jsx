import { Form, Row, Col, Input, Select, Icon, Switch, Button,message } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
//import { VCloudAPI } from '../../../axios/api';


class PayCondition extends React.Component {
    constructor(props){
        super(props);
        this.handleSave=this.handleSave.bind(this);
        this.handleSwitchTry=this.handleSwitchTry.bind(this);
    }

    handleSave(){
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const { my_live_config = {} } = this.props.alitaState || {};
            const liveConfig = my_live_config.data || {}
            //读取表单数据
            let formData = {...fieldsValue}
            delete formData.try_to_see;
            console.log(formData)

            const data={...liveConfig, ...formData} 
            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });
        })

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid;

        const data = (({condition,condition_type,price,duration,try_to_see}) => 
        ({condition,condition_type,price,duration,try_to_see}))(liveConfig)
        const config={
            "lid":lid,
            ...data
        }
        console.log(config)
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/condition/?aid=' + user.aid, {
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

    handleSwitchTry(switchValue){
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(switchValue)
        if (switchValue === false) {

            const data = { ...liveConfig, "try_to_see": 0 };
            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }
        else {
            const data = { ...liveConfig, "try_to_see": 1 };
            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        return (
            <div >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 8 }} onSubmit={this.handleOk}>
                    <Form.Item label="观看价格">
                        {getFieldDecorator('price', {
                               initialValue:liveConfig.price
                        })(<Input placeholder={"请输入观看直播所需要的价格"} />)}
                    </Form.Item>
                    <Form.Item label="付费有效期">
                        {getFieldDecorator('duration', {
                            initialValue:2
                        })(
                            <Select placeholder="请选择直播规模" >
                                <Option value={1}>一次付费永久有效</Option>
                                <Option value={2}>一个月有效</Option>
                                <Option value={3}>一年有效</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="试看">
                        {getFieldDecorator('try_to_see', {

                        })(
                            <Switch
                                defaultChecked={liveConfig.try_to_see}
                                onClick={this.handleSwitchTry}
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Row>
                            <Col span={3} offset={18}>
                                <Button type="primary" onClick={this.handleSave}>保存</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}
export default connectAlita()(Form.create()(PayCondition));