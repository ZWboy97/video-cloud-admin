import React from 'react';
import { Row, Col, Card } from 'antd';
import ClientsTable from './ClientsTable';
import BreadcrumbCustom from '../BreadcrumbCustom';

const BasicTables = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="在线客户端" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="在线用户" bordered={false}>
                        <ClientsTable />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default BasicTables;