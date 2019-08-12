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
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        if (switchValue === false) {
           const data={...liveConfig, "condition": 0}

            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }
        else {
            const data={...liveConfig, "condition": 1}

            this.props.setAlitaState({
                stateName: 'my_live_config',
                data: data
            });

        }
    }
    render() {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        return (
            <div >
                <Row>
                    <Col span={3}>
                        <div>无条件观看</div>
                    </Col>
                    <Col span={2}>
                        <Switch
                            defaultChecked={liveConfig.condition}
                            onClick={this.handleSwitch}
                            checkedChildren={<Icon type="check" />}
                            unCheckedChildren={<Icon type="close" />}
                        />
                    </Col>
                </Row>
                <div>{liveConfig.condition?[]:<div className="switch-content"><ConditionSelect /></div>}</div>

            </div>
        );
    }

}
export default connectAlita()(LiveConditionPage)