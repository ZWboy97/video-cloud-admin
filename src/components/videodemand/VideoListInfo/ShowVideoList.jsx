import {Button, Row, Col, Modal,Card} from 'antd';
import React, {Component} from "react";
import VideoSetting from './VideoSetting'
import PlaySetting from './PlaySetting'
import {connectAlita} from 'redux-alita';
import VideoCard from './VideoCard'


const props2 = {
    cover:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    title:"test"
}
class ShowVideoList extends Component {

    state = {visible: false};

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
                <Card>
                <Row>
                    <Col span={3}>
                        <Button type="primary" onClick={this.showModal} size='large' icon= "edit">
                            视频设置
                        </Button>
                        <Modal
                            title="视频设置"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            okText="确认"
                            cancelText="取消"
                            onCancel={this.handleCancel}
                        >
                            <VideoSetting/>
                        </Modal>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={this.showModal} size='large' icon = "form">
                            播放设置
                        </Button>
                        <Modal
                            title="播放设置"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            okText="确认"
                            cancelText="取消"
                            onCancel={this.handleCancel}
                        >
                            <PlaySetting/>
                        </Modal>
                    </Col>
                    <Col span={3}>
                        <Button type="primary"  size='large' icon= "delete">
                            删除视频
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary"  size='large' icon = "plus">
                            播放列表
                        </Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary"  size='large' icon = "scissor">
                            视频剪辑
                        </Button>
                    </Col>
                </Row>
                </Card>
                <Card>
                    <VideoCard/>
                </Card>
            </div>
        )
    }
}

export default connectAlita()(ShowVideoList);