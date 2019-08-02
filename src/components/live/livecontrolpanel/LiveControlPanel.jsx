import React from 'react';
import { Row, Col ,Card,PageHeader} from 'antd';
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
                <Row>
                    <Col span={15}>
                        <Row>
                            <Col span={15}>
                            <Card>
                                <VideoPlayer />
                                </Card>
                            </Col>
                            <Col span={8} offset={1}>
                            <Card>
                              wefr
                              </Card>
                            </Col>
                        </Row>
                        <MeansPanel />
                    </Col>
                    <Col span={8} offset={1}>
                        <ChattingPanel />
                    </Col>
                </Row>
            </div>

        )
    }

}

export default LiveControlPanel;