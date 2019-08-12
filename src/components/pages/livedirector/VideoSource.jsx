import React from 'react';
import { connectAlita } from 'redux-alita';
import {Row,Col} from 'antd';
import SingleVideoSource from './SingleVideoSource'
class VideoSource extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <SingleVideoSource id={1} />
                    </Col>
                    <Col span={8}>
                        <SingleVideoSource id={2} />
                    </Col>
                    <Col span={8}>
                        <SingleVideoSource id={3} />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <SingleVideoSource id={4} />
                    </Col>
                    <Col span={8}>
                        <SingleVideoSource id={5}/>
                    </Col>
                    <Col span={8}>
                        <SingleVideoSource id={6}/>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default connectAlita()(VideoSource);