import { Button,Row,Col ,Modal} from 'antd';
import React,{Component} from "react";
import VideoSetting from './VideoSetting'
import PlaySetting from './PlaySetting'
import { connectAlita } from 'redux-alita';

class ShowVideoList extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <Button type="primary" onClick={this.showModal} size= 'large'>
                            视频设置
                        </Button>
                        <Modal
                            title="视频设置"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            okText = "确认"
                            cancelText= "取消"
                            onCancel={this.handleCancel}
                        >
                          <VideoSetting/>
                        </Modal>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={this.showModal} size= 'large'>
                            播放设置
                        </Button>
                        <Modal
                            title="播放设置"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            okText = "确认"
                            cancelText= "取消"
                            onCancel={this.handleCancel}
                        >
                            <PlaySetting/>
                        </Modal>
                    </Col>
                    <Col span={6}>

                    </Col>
                    <Col span={6}>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default connectAlita()(ShowVideoList);