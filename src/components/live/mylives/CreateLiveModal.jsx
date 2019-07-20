import React, { Component } from 'react'
import { Button, Modal } from 'antd';
import './style.less'
import { connectAlita } from 'redux-alita';


class CreateLiveModal extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this)
    }


    handleCancel() {
        this.props.setAlitaState({
            stateName: 'create_live_modal',
            data: {
                visible: false,
                loading: false
            }
        })
    }

    handleOk() {
        this.props.setAlitaState({
            stateName: 'create_live_modal',
            data: {
                visible: true,
                loading: true
            }
        })
        //todu 读取输入的数据
    }

    render() {
        console.log('alitastate', this.props.alitaState)
        const { create_live_modal = {} } = this.props.alitaState;
        const { data } = create_live_modal;
        console.log('data:', data)
        const { visible = false, loading = false } = data || {};
        return (
            <div>
                <Modal
                    visible={visible}
                    title="创建新的直播频道"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={() => this.handleCancel.bind(this)}>
                            Return</Button>,
                        <Button key="submit" type="primary" loading={() => loading} onClick={this.handleOk}>
                            创建</Button>,
                    ]}
                >
                </Modal>
            </div>
        )
    }


}
// stateName 为create-live-modal，用于对创建直播的modal窗口进行控制
export default connectAlita()(CreateLiveModal);