import { Row, Col, Button, Upload, Form, Input, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';



class LiveIntroPicture extends React.Component {

    render() {

        const { intro_picture_set = {} } = this.props.alitaState;
        const { data } = intro_picture_set;
        const { orderButton =true,introPicture=require('../../../style/imgs/intro_content.png')} = data || {};
        return (
             
            <div>
               <img src={require('../../../style/imgs/intro_head.png')} alt="avatar" style={{ width: '100%' }} />
               <img src={introPicture} alt="avatar" style={{ width: '100%' }} />
               <img src={require('../../../style/imgs/intro_time.png')} alt="avatar" style={{ width: '100%' }} />
               {orderButton?<img src={require('../../../style/imgs/intro_order.png')} alt="avatar" style={{ width: '100%' }} />
               :<img src={require('../../../style/imgs/intro_no_order.png')} alt="avatar" style={{ width: '100%' }} />}              
            </div>
        );
    }

}
export default connectAlita()(LiveIntroPicture)