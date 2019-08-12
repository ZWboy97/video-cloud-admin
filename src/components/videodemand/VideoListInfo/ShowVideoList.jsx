import {Button, Row, Col, Modal,Card} from 'antd';
import React, {Component} from "react";
import VideoSetting from './VideoSetting'
import PlaySetting from './PlaySetting'
import {connectAlita} from 'redux-alita';
import VideoTable from './VideoTable'
import DeleteList from './DeleteList'
import VideoDownload from './VideoDownload'
import AddPlayList from "./AddPlayList";
class ShowVideoList extends Component {




    render() {
        return (
            <div>
                <Card>
                <Row>
                    <Col span={3}>
                        <VideoSetting/>
                    </Col>
                    <Col span={3}>
                        <PlaySetting/>
                    </Col>
                    <Col span={3}>
                        <VideoDownload/>
                    </Col>
                    <Col span={3}>
                        <DeleteList/>
                    </Col>
                    <Col span={3}>
                        <AddPlayList/>
                    </Col>
                </Row>
                </Card>
                <Card>
                    <VideoTable/>
                </Card>
            </div>
        )
    }
}

export default connectAlita()(ShowVideoList);