import React from 'react';
import { connectAlita } from 'redux-alita';
import { Button, Radio, Modal, Row, Col } from 'antd';
import DemandLiveTab from './DemandLiveTab';
import LiveRoomTab from './LiveRoomTab';
import NewLiveTab from './NewLiveTab';


class AddVideoModal extends React.Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {

        this.props.setAlitaState({
            stateName: 'add_video_modal',
            data: {
                visible: true,
                mean: e.target.value
            }
        })
    };

    handleCancel() {
        this.props.setAlitaState({
            stateName: 'add_video_modal',
            data: {
                visible: false,
                mean: 1
            }
        })
    }

    handleOk() {
        this.props.setAlitaState({
            stateName: 'add_video_modal',
            data: {
                visible: false,
                mean: 1
            }
        })
    }

    render() {
        const { add_video_modal = {} } = this.props.alitaState;
        const { data } = add_video_modal;
        const { visible = false, mean = 1 } = data || {};
        console.log(mean)

        let content = [];
        if (mean === 1) {
            content = (
                
                <Row>
                    <Col offset={3}>
                        <NewLiveTab />
                    </Col>
                </Row>)
        } else if (mean === 2) {
            content = (
            <Row>
                <Col offset={3}>
                    <LiveRoomTab />
                </Col>
            </Row>)
        } else if (mean === 3) {
            content = (
            <Row>
                <Col offset={3}>
                    <DemandLiveTab />
                </Col>
            </Row>)
        }
        else { content = [] }

        return (
            <div>
                <Modal
                className="add-video-modal"
                    visible={visible}
                    title="添加视频"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确定</Button>,
                    ]}>
                    <Row>
                        <Col offset={2}>
                            <Radio.Group onChange={this.onChange} value={mean}>
                                <Radio value={1}>新建直播流</Radio>
                                <Radio value={2}>从直播控制台选取</Radio>
                                <Radio value={3}>从媒资库选取</Radio>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <div>&nbsp;</div>
                    <div>{content}</div>
                </Modal>
            </div>
        )
    }
}

export default connectAlita()(AddVideoModal);