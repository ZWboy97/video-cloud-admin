import React from 'react';
import { Row, Col, Card, Switch } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import StreamsTable from '../tables/StreamsTable';


class BasicAnimations extends React.Component {
    state = {

    };
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom second="直播流管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="在线直播流" bordered={false}>
                                <StreamsTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={14}>

                </Row>
            </div>
        )
    }
}

export default BasicAnimations;