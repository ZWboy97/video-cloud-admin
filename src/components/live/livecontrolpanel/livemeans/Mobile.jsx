import React from 'react';
import { Row, Col, Icon } from 'antd';
import QRCode from 'qrcode.react';
import { connectAlita } from 'redux-alita';



class Mobile extends React.Component {


    render() {
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData } = live_setting_page.data || {}
        var qrObj = Object();
        qrObj.push_url = liveData.push_url;
        qrObj.name = liveData.name;
        return (
            <Row>
                <Col span={18} offset={2}>
                    <Row className="qrcode-style">
                        <QRCode value={JSON.stringify(qrObj)} />
                    </Row>
                    <div className="warnning-text">
                        <Icon type="info-circle" />
                        &nbsp;&nbsp; 使用配套的直播APP扫描二维码开启直播
                    </div>
                </Col>
            </Row>

        )
    }

}

export default connectAlita()(Mobile);