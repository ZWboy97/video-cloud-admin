import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import EchartsViews from './EchartsViews';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">直播</div>
                                        <h2>3</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">云数据</div>
                                        <h2>30122</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Link to="/app/lives/mylives/">
                                <Card bordered={false}>
                                    直播列表
                                </Card>
                            </Link>
                        </div>
                        <div className="gutter-box">
                            <Link to="/director" target="_blank">
                                <Card bordered={false}>
                                    导播台
                                </Card>
                            </Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">照片</div>
                                        <h2>802</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">邮件</div>
                                        <h2>102</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Link to="/app/vod/upload">
                                <Card bordered={false}>
                                    视频上传
                                </Card>
                            </Link>
                        </div>
                        <div className="gutter-box">
                            <Link to="/app/vod/videolist">
                                <Card bordered={false}>
                                    点播列表
                                </Card>
                            </Link>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                </div>
                                <span className="card-tool"><Icon type="sync" /></span>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片内容
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片内容
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片
                            </Card>
                        </div>
                    </Col>
                </Row>

                <Row gutter={10}>

                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片内容
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                卡片
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;