import { Switch, Icon, Row, Col } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import ConditionSelect from './ConditionSelect'
//import { VCloudAPI } from '../../../axios/api';


class LiveConditionPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleSwitch = this.handleSwitch.bind(this);
    }
    handleSwitch(switchValue) {
        console.log(switchValue)
        if (switchValue === false) {
            const closeContent = (
                <div className="switch-content"><ConditionSelect /></div>
            );
            this.props.setAlitaState({
                stateName: 'conditionSwitch_content',
                data: {
                    content: closeContent

                }
            })

        }
        else {
            const openContent = (
                <div />
            );
            this.props.setAlitaState({
                stateName: 'conditionSwitch_content',
                data: {
                    content: openContent

                }
            })
        }

    }
    render() {
        const swiContent = (
            <div />
        );
        const { conditionSwitch_content = {} } = this.props.alitaState;
        const { data } = conditionSwitch_content;
        const { content = swiContent } = data || {};
        console.log(content);
        return (
            <div >
                <Row>
                    <Col span={3}>
                        <div>无条件观看</div>
                    </Col>
                    <Col span={2}>
                        <Switch
                            defaultChecked
                            onClick={this.handleSwitch}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Col>
                </Row>
                <div>{content}</div>

            </div>
        );
    }

}
export default connectAlita()(LiveConditionPage)