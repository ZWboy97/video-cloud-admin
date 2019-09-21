import React from 'react';
import { Row, Col, Input, Icon, Button } from 'antd';
import { MediaAPI } from 'myaxios/api';


class Pull extends React.Component {

    state = {
        isPushing: false,
        pullUrl: ""
    }

    streamPushHandler = () => {
        MediaAPI.post('/api/ffmpeg/stream-push-start', {
            "pull_stream_url": "http://39.106.194.43:8090/live/sq3oOJjN6s.flv",
            "push_stream_url": "rtmp://39.106.194.43:1935/live/i2yTkvYgLQ?auth_key=9487f14f4544ee2ae2d995ec4de2172d&vhost=default"
        }).then(response => {
            console.log('response', response);
        })
    }


    render() {
        return (
            <Row>
                <Col span={18} offset={2}>
                    <Row className="address-style">
                        <Col span={7} offset={1}>
                            请输入拉流地址：
                </Col>
                        <Col span={16} >
                            <Input value={this.state.pullUrl} />
                        </Col>
                    </Row>
                    <div className="warnning-text">
                        <Icon type="info-circle" />
                        &nbsp;&nbsp;拉流地址支持：直播流：rtmp、rtsp、hls等，点播流：hls、mp4等
                    </div>
                    <div className="start-button">
                        <Button type="primary" onClick={() => this.streamPushHandler()}>
                            {this.state.isPushing ? '停止直播' : '开始直播'} </Button>
                    </div>
                </Col>
            </Row>

        )
    }

}

export default Pull;