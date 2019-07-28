import React, {Component} from 'react';
import {Upload, Modal, Button, Input, Select, Card, Icon} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {connectAlita} from 'redux-alita'
import {Form} from "antd/lib/form";
import locale from "antd/lib/date-picker/locale/zh_CN";
import CreateLiveModal from "../live/mylives/CreateLiveModal";
import LiveTable from "../live/mylives/LiveTable";


class CreateChannelModal extends Component{

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleOk = this.handleOk.bind(this)
    }

    handleChange = ({fileList}) => this.props.setAlitaState({fileList});
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
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            this.props.setAlitaState({
                stateName: 'create_live_modal',
                data: {
                    visible: true,
                    loading: true
                }
            })
            //todu 读取输入的数据
        })
    }
    render() {

        console.log('alitastate', this.props.alitaState)
        const { create_channel_modal = {} } = this.props.alitaState;
        const { data } = create_channel_modal;
        const { visible = false, loading = false } = data || {};

        return (
            <div>
                <Modal
                    visible={visible}
                    title="创建新的频道"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            创建</Button>,
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={this.handleChange}
                    >
                        <Button>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>

                </Modal>

            </div>
        )
    }
}

export default connectAlita()(CreateChannelModal)