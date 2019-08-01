import {Button, Row, Col, Modal, Card} from 'antd';
import React, {Component} from "react";
import VideoSetting from './VideoSetting'
import PlaySetting from './PlaySetting'
import {connectAlita} from 'redux-alita';
import VideoCard from './VideoCard'


const props2 = {
    cover: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    title: "test"
}

class ShowVideoList extends Component {

    state = {
        modal1Visible: false,
        modal2Visible: false
    };


    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }

    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }


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
                            <Button type="primary" onClick={()=> this.setModal1Visible(true)} size='large' icon="edit">
                                视频设置
                            </Button>
                            <Modal
                                title="视频设置"
                                visible={this.state.modal1Visible}
                                onOk={() => this.setModal1Visible(false)}
                                okText="确认"
                                cancelText="取消"
                                onCancel={() => this.setModal1Visible(false)}
                            >
                                <VideoSetting/>
                            </Modal>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" onClick={()=> this.setModal2Visible(true)} size='large' icon="form">
                                播放设置
                            </Button>
                            <Modal
                                title="播放设置"
                                visible={this.state.modal2Visible}
                                onOk={() => this.setModal2Visible(false)}
                                okText="确认"
                                cancelText="取消"
                                onCancel={() => this.setModal2Visible(false)}
                            >
                                <PlaySetting/>
                            </Modal>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" size='large' icon="delete">
                                删除视频
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" size='large' icon="plus">
                                播放列表
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Button type="primary" size='large' icon="scissor">
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