import {Button, Row, Col, Modal, Card, Form,Avatar} from 'antd';
import React, {Component} from "react";
import VideoSetting from './VideoSetting'
import {connectAlita} from 'redux-alita';
import Player from 'griffith'

const sources = {
    hd: {
        play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
    },
    sd: {
        play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
    },
}

class VideoCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Col span={6}>
                        <Player sources={sources} />
                    </Col>

                </Card>
            </div>
        )
    }

}

export default connectAlita()(Form.create()(VideoCard));