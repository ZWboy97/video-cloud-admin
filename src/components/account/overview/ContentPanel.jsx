import React from 'react';
import { Row, Col, Card, Button } from 'antd';

class ContentPanel extends React.Component {
    render() {
        const money_remain = 2000;
        return (
            <div>

                <Row gutter={10}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="账户余额" bordered={false}>
                                <div className="account-balance-container">
                                    <div className="balance-count-container" >
                                        {money_remain}￥
                                    </div>
                                    <div className="balance-operation-container">
                                        <Button type="primary">充值</Button>
                                        <Button type="primary">提现</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="服务总览" bordered={false}>
                                <div className="clear y-center">

                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card title="账单总览" bordered={false}>
                                <div className="clear y-center">
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>)
    }
}

export default ContentPanel;
