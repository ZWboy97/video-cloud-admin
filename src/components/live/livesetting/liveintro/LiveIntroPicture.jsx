import { Row, Col, Button, Upload, Form, Input, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';



class LiveIntroPicture extends React.Component {

    render() {

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        return (

            <div>
                <img src={require('../../../../style/imgs/intro_head.png')} alt="avatar" style={{ width: '100%' }} />
                <img src={liveConfig.pre_pic} alt="avatar" style={{ width: '100%' }} />
                <img src={require('../../../../style/imgs/intro_time.png')} alt="avatar" style={{ width: '100%' }} />
                {liveConfig.qorder ? <img src={require('../../../../style/imgs/intro_order.png')} alt="avatar" style={{ width: '100%' }} />
                    : <img src={require('../../../../style/imgs/intro_no_order.png')} alt="avatar" style={{ width: '100%' }} />}
            </div>
        );
    }

}
export default connectAlita()(LiveIntroPicture)