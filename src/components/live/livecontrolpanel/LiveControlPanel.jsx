import React from 'react';
import { Row, Col, Card, message } from 'antd';
import VideoPlayer from '../../videoplayer/FlvVideoPlayer/VideoPanel';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import ChattingPanel from './livechatting/ChattingPanel'
import MeansPanel from './livemeans/MeansPanel'
import { connectAlita } from 'redux-alita';
import { withRouter } from 'react-router-dom';
import { getLocalStorage } from '../../../utils/index';
import { VCloudAPI } from '../../../axios/api';

class LiveControlPanel extends React.Component {

    componentDidMount() {
        const lid = this.props.match.params.lid;
        const user = getLocalStorage('user');
        console.log(lid)
        VCloudAPI.get("/com/" + user.cid + '/liveroom/all_config/?aid=' + user.aid + "&lid=" + lid, {
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                console.log(data)
                if (code === 200) {
                    message.success('获取配置成功')
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
                        data: data
                    });
                    const { live_room_info } = data
                    const liveInfo = { liveData: { ...live_room_info } }
                    this.props.setAlitaState({
                        stateName: 'live_setting_page',
                        data: liveInfo
                    });
                } else {
                    message.error('获取配置失败!')
                }
            }
        })

    }

    render() {
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData = {} } = live_setting_page.data || {}
        return (
            <div>
                <BreadcrumbCustom first="我的直播" second="直播控制台" />
                <Row>
                    <Col span={3}>
                        <div className="live-name">{liveData.name}</div>
                    </Col>
                    <Col span={15}>
                        <Row className="pull-address">
                            <Col span={3}>
                                <div>&nbsp;&nbsp;直播页面:</div>
                            </Col>
                            <Col span={20}>
                                <a href={liveData.display_url} target="_blank" rel="noopener noreferrer">{liveData.display_url}</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div className="video-box">
                    <Row>
                        <Col span={15}>
                            <Row>
                                <Col span={17}>
                                    <VideoPlayer
                                        url={liveData.pull_http_flv_url}
                                        poster={liveData.pre_pic}
                                    />
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

export default withRouter(connectAlita()(LiveControlPanel));
