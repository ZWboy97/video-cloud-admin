import { Row, Col, Button, Divider, Form, Input } from 'antd';
import React from 'react';
import './style.less';
import WhiteBlackSet from './WhiteBlackSet'
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';


class LiveRightPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleSet = this.handleSet.bind(this);
    }
    handleSet() {
        console.log("click set button")
        this.props.setAlitaState({
            stateName: 'white_black_set',
            data: {
                visible: true,
            }
        })
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const { white_black_set = {} } = this.props.alitaState;
        const { data } = white_black_set;
        const { white = '', black = '' } = data || {};
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={15}>
                        <WhiteBlackSet />
                        <Row className="content-padding">
                            <Col span={3}>
                                <div>推流地址</div>
                            </Col>
                            <Col span={13}>
                                <div>https://live.polyv.net/start-client.html?channelId=353896 key=wejnfcwejijiwf</div>
                            </Col>
                            <Col span={3}>
                                <Button type="primary">更新key</Button>
                            </Col>
                        </Row>
                        <Divider />
                        <Row >
                            <Col span={5}>
                                <div>播放网站权限设置</div>
                            </Col>

                            <Col span={18}>
                                <div className="warning-text">设置后，设置播放黑白名单，白名单允许播放、黑名单无法播放</div>
                            </Col>
                        </Row>
                        <Form className="content-padding" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleOk}>
                            <Form.Item label="黑名单">
                                {getFieldDecorator('black', {
                                    initialValue: black
                                })(
                                    <div className="input-area">
                                        <TextArea disabled={true} value={black} className="text-area" rows={5} />
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item label="白名单">
                                {getFieldDecorator('white', {
                                })(
                                    <div className="input-area">
                                        <TextArea disabled={true} value={white} className="text-area" rows={5} />
                                    </div>
                                )}
                            </Form.Item>
                            <Form.Item >
                                <Row>
                                    <Col span={5} offset={15}>
                                        <Button className="" type="primary" onClick={this.handleSet}>设置</Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveRightPage))