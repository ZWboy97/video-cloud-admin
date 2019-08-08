import { Form, Row, Col, Input, Button,message } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
//import { VCloudAPI } from '../../../axios/api';


class VerifyCondition extends React.Component {
    constructor(props){
        super(props);
        this.handleSave=this.handleSave.bind(this);
        this.handleChange.this.handleChange.bind(this);
    }

    handleSave(){
        
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid;

        const data = (({condition,condition_type,verification_code}) => 
        ({condition,condition_type,verification_code}))(liveConfig)
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
    handleChange(e){
        console.log(e.target.value)
        const { my_live_config = {} } = this.props.alitaState || {};
            const liveConfig = my_live_config.data || {}
            //读取表单数据
            const data={...liveConfig, "verification_code":e.target.value} 
            console.log(data)
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
            <div >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 7 }} onSubmit={this.handleOk}>

                    <Form.Item label="验证码">
                        {getFieldDecorator('verification_code', {
                            initialValue:liveConfig.verification_code

                        })(<Input onChange={this.handleChange} />)}
                    </Form.Item>

                    <Form.Item >
                        <Row>
                            <Col span={2} offset={22}>
                                <Button type="primary" onClick={this.handleSave}>保存</Button>
                            </Col>
                        </Row>

                    </Form.Item>


                </Form>
            </div>
        );
    }

}
export default connectAlita()(Form.create()(VerifyCondition));