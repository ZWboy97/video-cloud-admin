import { Radio, Row, Col } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import PayCondition from './PayCondition';
import VerifyCondition from './VerifyCondition';
import WhiteCondition from './WhiteCondition';
//import { VCloudAPI } from '../../../axios/api';


class ConditionSelect extends React.Component {



    onChange = e => {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

            const data={...liveConfig, "condition_type": e.target.value}
            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });
        
        console.log('radio checked', e.target.value);
    };
    render() {
      
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        let content=[];
        if(liveConfig.condition_type===1){
            content=(<div className="radio-content"><PayCondition /></div>)
        }else if(liveConfig.condition_type===2){
            content=(<div className="radio-content"><WhiteCondition /></div>)
        }else if(liveConfig.condition_type===3){
            content=(<div className="radio-content"><VerifyCondition /></div>)
        }
        else{content=[]}
        return (
            <div >
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={17}>
                        <Row>
                            <Col span={4}>
                                <div>选择观看条件</div>
                            </Col>
                            <Col span={19}>
                                <Radio.Group onChange={this.onChange} value={liveConfig.condition_type}>
                                    <Radio value={1}>付费观看</Radio>
                                    <Radio value={2}>白名单观看</Radio>
                                    <Radio value={3}>验证码观看</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <div>{content}</div>
                    </Col>
                </Row>
            </div>
        );
    }

}
export default connectAlita()(ConditionSelect)