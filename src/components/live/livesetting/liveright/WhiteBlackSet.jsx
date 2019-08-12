import React, { Component } from 'react'
import { Button, Modal,Input, Form, Row, Col,message } from 'antd';
import './style.less'
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
import { withRouter } from 'react-router-dom';




class WhiteBlackSet extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }


    handleCancel() {
        this.props.setAlitaState({
            stateName: 'white_black_set',
            data: {
                visible: false,
            }
        })
    }

    handleOk() {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        const data = {
            ...liveConfig, 
            "black_site_list": this.props.form.getFieldValue("black_site_list"),
            "white_site_list": this.props.form.getFieldValue("white_site_list")
        };
        this.props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });

        this.props.setAlitaState({
            stateName: 'white_black_set',
            data: {
                visible: false,
            }
        })
        const lid =liveConfig.live_room_info.lid;

        const config={
            "lid":lid,
            "black_site_list": data.black_site_list,
            "white_site_list": data.white_site_list
        }
        console.log(config)
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/auth_safe/?aid=' + user.aid, {
            ...config
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                if (code === 200) {
                    message.success('修改成功!');

                } else {
                    message.error('修改失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { white_black_set = {} } = this.props.alitaState;
        const { data } = white_black_set;
        const { visible = false} = data || {};

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        console.log(visible)

        return (
            <div>
                <Modal
                    visible={visible}
                    title="播放网站设置"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确认保存</Button>,
                    ]}>

                    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} onSubmit={this.handleOk}>
                        <Form.Item label="播放网站黑名单">
                            {getFieldDecorator('black_site_list', {
                                initialValue: liveConfig.black_site_list
                            })(<Input />)}
                        </Form.Item>

                        <Form.Item label="播放网站白名单">
                            {getFieldDecorator('white_site_list', {
                                initialValue: liveConfig.white_site_list
                            })(
                                <Input />
                            )}
                        </Form.Item>


                        <Row>
                            <Col span={20} offset={5}>
                                <div className="warning-text">只需要填写域名，多个域名之间用英文分号分隔，
                                 如：domain.com;domain2.net;sub.domain3.net;</div>
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create()(WhiteBlackSet);


export default withRouter(connectAlita()(WrappedApp));
