import React from 'react';
import { Row, Col, Input, message, Button } from 'antd';
import { connectAlita } from 'redux-alita';
import copyToBoard from 'copy-to-clipboard';

class Professional extends React.Component {

    render() {
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData } = live_setting_page.data || {}
        return (
            <div>
                <Row >
                    <Col span={16} offset={4}>
                        <div className="means-title">直播推流地址</div>
                        <div className="address-style">
                            <Input
                                value={liveData.push_url}
                            />
                        </div>
                        <div className="start-button">
                            <Button type="primary"
                                onClick={e => {
                                    e.preventDefault();
                                    copyToBoard(liveData.push_url);
                                    message.success('复制成功');
                                }}
                            >复制地址</Button>
                        </div>
                    </Col>
                </Row>
            </div >

        )
    }
}

export default connectAlita()(Professional);