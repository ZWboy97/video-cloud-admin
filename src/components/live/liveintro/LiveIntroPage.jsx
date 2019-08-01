import { Row, Col, message, Divider, Form, Input } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import LiveIntroSet from './LiveIntroSet';
import LiveIntroPicture from './LiveIntroPicture'
//import { VCloudAPI } from '../../../axios/api';


class LiveIntroPage extends React.Component {

    render() {

        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={10}>
                        <LiveIntroSet/>
                    </Col>
                    <Col span={6}>
                        <LiveIntroPicture/>
                    </Col>
                </Row>
            </div>
        );
    }

}
export default connectAlita()(LiveIntroPage)