import React from 'react';
import { connectAlita } from 'redux-alita';
import './style.less';
import { Row, Col, Icon ,Button} from 'antd';

class VideoShow extends React.Component {
    render() {
        return (
            <div>
                <div className="video-show-head">
                    <Button type="primary">开始直播</Button>
                </div>
                <div className="show-page">
                    <Row>
                        <Col span={12}>
                            <div className="pre-show">
                                <div>预览界面</div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="live-show">
                                 观看界面
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="video-show-bottom">
                    <Icon type="swap" />
                </div>
            </div>
        );
    }
}
export default connectAlita()(VideoShow);