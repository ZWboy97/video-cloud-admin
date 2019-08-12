import React from 'react';
import { connectAlita } from 'redux-alita';
import {Row,Col} from 'antd';
import AddVideoModal from './AddVideoModal'
import PictureAndText from './PictureAndText'
import AddLayoutModal from './AddLayoutModal'
import VideoLayout from './VideoLayout'
import VideoShow from './VideoShow'
import VideoSound from './VideoSound'
import VideoSource from './VideoSource'

class DirectorPage extends React.Component {
    render() {
        return (
            <div className="director-page">
                <AddLayoutModal />
                <AddVideoModal />
                <Row>
                    <Col span={11}>
                        <div className="video-source"><VideoSource /></div>
                    </Col>
                    <Col span={13}>
                    <div className="video-show"><VideoShow /></div>
                    </Col>
                </Row>
                <div className="video-layout"><VideoLayout /></div>
                <Row>
                    <Col span={11}>
                    <div className="video-sound"><VideoSound /></div>
                    </Col>
                    <Col span={13}>
                    <div className="video-picture"><PictureAndText /></div>
                    </Col>
                </Row>

            </div>
        );
    }
}
export default connectAlita()(DirectorPage);