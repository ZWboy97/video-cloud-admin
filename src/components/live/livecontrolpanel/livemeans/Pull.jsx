import React from 'react';
import { Row, Col, Input, Icon, Button } from 'antd';


class Pull extends React.Component {


    render() {
        return (
            <Row>
                <Col span={18} offset={2}>
                    <Row className="address-style">
                        <Col span={7} offset={1}>
                            请输入拉流地址：
                </Col>
                        <Col span={16} >
                            <Input />
                        </Col>

                    </Row>
                    <div className="warnning-text">
                        <Icon type="info-circle" />
                        &nbsp;&nbsp;拉流地址支持：直播流：rtmp、rtsp、hls等，点播流：hls、mp4等
                    </div>
                    <div className="start-button">
                        <Button type="primary">开始直播</Button>
                    </div>
                </Col>
            </Row>

        )
    }

}

export default Pull;