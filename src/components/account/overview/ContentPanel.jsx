import React from 'react';
import { Row, Col, Card, Button, Table } from 'antd';
import BillTable from './BillTable';
import ServesTable from './ServesTable';

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
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button type="primary">提现</Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="账单总览" bordered={false}>
                                <BillTable />
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card title="服务总览" bordered={false}>
                                <ServesTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>)
    }
}

export default ContentPanel;
