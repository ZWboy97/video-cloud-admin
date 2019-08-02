import React from 'react';
import { Row, Col, Card, PageHeader } from 'antd';
import VideoPlayer from '../../videoplayer/FlvVideoPlayer/VideoPanel';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import ChattingPanel from './livechatting/ChattingPanel'
import MeansPanel from './livemeans/MeansPanel'

class LiveControlPanel extends React.Component {


    render() {
        return (
            <div>
                <BreadcrumbCustom first="我的直播" second="直播控制台" />

                <Row>
                    <Col span={3}>
                        <div className="live-name">直播名称</div>
                    </Col>
                    <Col span={15}>
                        <Row className="pull-address">
                            <Col span={3}>
                                <div>&nbsp;&nbsp;拉流地址:</div>
                            </Col>
                            <Col span={20}>
                                <a href="javascript:;">http:jhwedjihferilufjerioljekrmfkrlfwke34utuig76f</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div  className="video-box">
                <Row>
                    <Col span={15}>
                        
                            <Row>
                                <Col span={17}>
                                    
                                        <VideoPlayer />
                                    
                                </Col>
                                <Col span={6} >
                                    <div className="data-show">
                                    <Card title="实时监控数据">
                                        <p>观看量：5</p>
                                        <p>在线人数：5</p>
                                        <p>&nbsp;</p>
                                        <p>&nbsp;</p>
                              </Card>
                              </div>
                                </Col>
                            </Row>
                        <MeansPanel />
                    </Col>
                    <Col span={8} >
                        <ChattingPanel />
                    </Col>
                </Row>
                </div>
            </div>

        )
    }

}

export default LiveControlPanel;