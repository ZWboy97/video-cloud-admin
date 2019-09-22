import React from 'react';
import { Row, Col, Input, Icon, Button, message } from 'antd';
import { MediaAPI } from 'myaxios/api';
import { connectAlita } from 'redux-alita';


class Pull extends React.Component {

    state = {
        isPushing: false,
        pullUrl: "..."
    }

    inPutChangeHandler = (e) => {
        this.setState({
            pullUrl: e.target.value
        })
    }

    streamPushHandler = () => {
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData } = live_setting_page.data || {}
        var push_url = liveData.push_url;

        if (this.state.isPushing) {
            MediaAPI.post('/api/ffmpeg/stream-push-stop', {
                "pull_stream_url": this.state.pullUrl,
                "push_stream_url": push_url
            }).then(response => {
                if (response.status === 200) {
                    const { data } = response;
                    if (data.result === "success") {
                        message.success("拉流直播停止成功！");
                        this.setState({
                            isPushing: false
                        })
                    } else if (data.result === "error") {
                        message.success("拉流直播不存在！");
                    }
                }
            })
            return;
        }
        MediaAPI.post('/api/ffmpeg/stream-push-start', {
            "pull_stream_url": this.state.pullUrl,
            "push_stream_url": push_url
        }).then(response => {
            console.log('response', response)
            if (response.status === 200) {
                const { data } = response;
                if (data.result === "success") {
                    message.success("拉流直播启动成功！");
                    this.setState({
                        isPushing: true
                    })
                } else if (data.result === "error") {
                    message.success("拉流直播启动失败！");
                } else if (data.result === "conflict") {
                    message.success("拉流直播与已有直播冲突！");
                }
            }
        })
    }

    componentDidMount() {
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData } = live_setting_page.data || {}
        var push_url = liveData.push_url;
        MediaAPI.post('/api/ffmpeg/stream-push-status', {
            "pull_stream_url": this.state.pullUrl,
            "push_stream_url": push_url
        }).then(response => {
            if (response.status === 200) {
                const { data } = response;
                if (data.result === "active") {
                    this.setState({
                        isPushing: true
                    })
                } else if (data.result === "inactive") {
                    this.setState({
                        isPushing: false
                    })
                }
            }
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
                            <Input value={this.state.pullUrl} onChange={this.inPutChangeHandler} />
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

export default connectAlita()(Pull);