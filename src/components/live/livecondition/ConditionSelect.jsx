import { Radio, Icon, Row, Col } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import PayCondition from './PayCondition';
import VerifyCondition from './VerifyCondition' ;
import WhiteCondition from './WhiteCondition';
//import { VCloudAPI } from '../../../axios/api';


class ConditionSelect extends React.Component {
    
   
    
      onChange = e => {
          if(e.target.value===1){
              const firstContent=(
                  <div className="radio-content"><PayCondition/></div>
              );
              this.props.setAlitaState({
                  stateName: 'condition_radio_content',
                  data: {
                      content: firstContent,
                      value: 1
                  }
              })
          }
          else if(e.target.value===2){
            const secondContent=(
                <div className="radio-content"><WhiteCondition/></div>
            );
            this.props.setAlitaState({
                stateName: 'condition_radio_content',
                data: {
                    content: secondContent,
                    value: 2
                }
            })
        }
        else if(e.target.value===3){
            const forthContent=(
                <div className="radio-content"><VerifyCondition/></div>
            );
            this.props.setAlitaState({
                stateName: 'condition_radio_content',
                data: {
                    content: forthContent,
                    value: 3
                }
            })
        }
        console.log('radio checked', e.target.value);
      };
    render() {
        const radioContent=(<div className="radio-content"><PayCondition/></div>);
        const { condition_radio_content = {} } = this.props.alitaState;
        const { data } = condition_radio_content;
        const { content=radioContent,value=1} = data || {};
        return (
            <div >
                <Row>
                    <Col span={3}>
                        <div>选择观看条件</div>
                    </Col>
                    <Col span={19}>
                        <Radio.Group onChange={this.onChange} value={value}>
                            <Radio value={1}>付费观看</Radio>
                            <Radio value={2}>白名单观看</Radio>
                            <Radio value={3}>验证码观看</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <div>{content}</div>

            </div>
        );
    }

}
export default connectAlita()(ConditionSelect)