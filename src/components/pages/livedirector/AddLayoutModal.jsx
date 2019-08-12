import React from 'react';
import { Modal, Button, Row, Col, Select } from 'antd';
import { connectAlita } from 'redux-alita';
const { Option } = Select;
class AddLayoutModal extends React.Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleClick = this.handleClick.bind(this)

    }
    handleClick(layout) {
        this.props.setAlitaState({
            stateName: 'layout_select',
            data: {
                layout_style: layout
            }
        })
    }


    handleCancel() {
        this.props.setAlitaState({
            stateName: 'add_layout_modal',
            data: {
                visible: false,
            }
        })
    }

    handleOk() {
        this.props.setAlitaState({
            stateName: 'add_layout_modal',
            data: {
                visible: false,
            }
        })
    }

    render() {


        const { add_layout_modal = {} } = this.props.alitaState;
        const { data } = add_layout_modal;
        const { visible = false } = data || {};

        const { layout_select = {} } = this.props.alitaState || {};
        const liveLayout = layout_select.data || {}

        const layout = [0, 0, 0, 0, 0, 0]
        layout[liveLayout.layout_style - 1] = 1
        let layoutContent = [];
        if (liveLayout.layout_style === 1) {
            layoutContent = (
                <Row>
                    <Col span={15}>
                        <img src={require("../../../style/imgs/layout1_big.png")} alt="avatar" style={{ width: '100%' }} />
                    </Col>
                    <Col span={8} offset={1}>
                        <div>
                            <Select placeholder="请选择A的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>

            )
        } else if (liveLayout.layout_style === 2) {
            layoutContent = (
                <Row>
                    <Col span={15}>
                <img src={require("../../../style/imgs/layout2_big.png")} alt="avatar" style={{ width: '100%' }} />
                </Col>
                    <Col span={8} offset={1}>
                        <div>
                            <Select placeholder="请选择A的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择B的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>

                            </Select>
                        </div>
                    </Col>
                </Row>
            )
        } else if (liveLayout.layout_style === 3) {
            layoutContent = (
                <Row>
                    <Col span={15}>
                <img src={require("../../../style/imgs/layout3_big.png")} alt="avatar" style={{ width: '100%' }} />
                </Col>
                    <Col span={8} offset={1}>
                        <div>
                            <Select placeholder="请选择A的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择B的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>

                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择C的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                       
                    </Col>
                </Row>
            )
        } else if (liveLayout.layout_style === 4) {
            layoutContent = (
                <Row>
                    <Col span={15}>
                <img src={require("../../../style/imgs/layout4_big.png")} alt="avatar" style={{ width: '100%' }} />
                </Col>
                    <Col span={8} offset={1}>
                        <div>
                            <Select placeholder="请选择A的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择B的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>

                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择C的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                        
                    </Col>
                </Row>
            )
        } else if (liveLayout.layout_style === 5) {
            layoutContent = (
                <Row>
                    <Col span={15}>
                <img src={require("../../../style/imgs/layout5_big.png")} alt="avatar" style={{ width: '100%' }} />
                </Col>
                    <Col span={8} offset={1}>
                        <div>
                            <Select placeholder="请选择A的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择B的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>

                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择C的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择D的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            )
        } else if (liveLayout.layout_style === 6) {
            layoutContent = (
                <Row>
                    <Col span={15}>
                <img src={require("../../../style/imgs/layout6_big.png")} alt="avatar" style={{ width: '100%' }} />
                </Col>
                    <Col span={8} offset={1}>
                        <div>
                            <Select placeholder="请选择A的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                        <div>
                            <Select placeholder="请选择B的视频源" style={{ width: '100%' }}>
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>
                            </Select>
                        </div>
                    </Col>
                </Row>
            )
        }

        console.log(liveLayout.layout_style)
        return (
            <div>
                <Modal
                    visible={visible}
                    title="添加布局"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确定</Button>,
                    ]}>
                    <div className="layout-text">布局模板</div>

                    <Row>
                        <Col span={3} offset={3}>
                            <a href="javascript:;" onClick={() => this.handleClick(1)}>
                                {layout[0]
                                    ? <img src={require('../../../style/imgs/layout1_click.png')} alt="avatar" style={{ width: '100%' }} />
                                    : <img src={require('../../../style/imgs/layout1.png')} alt="avatar" style={{ width: '100%' }} />
                                }
                            </a>
                        </Col>
                        <Col span={3}>
                            <a href="javascript:;" onClick={() => this.handleClick(2)}>
                                {layout[1]
                                    ? <img src={require('../../../style/imgs/layout2_click.png')} alt="avatar" style={{ width: '100%' }} />
                                    : <img src={require('../../../style/imgs/layout2.png')} alt="avatar" style={{ width: '100%' }} />
                                }
                            </a>
                        </Col>
                        <Col span={3}>
                            <a href="javascript:;" onClick={() => this.handleClick(3)}>
                                {layout[2]
                                    ? <img src={require('../../../style/imgs/layout3_click.png')} alt="avatar" style={{ width: '100%' }} />
                                    : <img src={require('../../../style/imgs/layout3.png')} alt="avatar" style={{ width: '100%' }} />
                                }
                            </a>
                        </Col>
                        <Col span={3}>
                            <a href="javascript:;" onClick={() => this.handleClick(4)}>
                                {layout[3]
                                    ? <img src={require('../../../style/imgs/layout4_click.png')} alt="avatar" style={{ width: '100%' }} />
                                    : <img src={require('../../../style/imgs/layout4.png')} alt="avatar" style={{ width: '100%' }} />
                                }
                            </a>
                        </Col>
                        <Col span={3}>
                            <a href="javascript:;" onClick={() => this.handleClick(5)}>
                                {layout[4]
                                    ? <img src={require('../../../style/imgs/layout5_click.png')} alt="avatar" style={{ width: '100%' }} />
                                    : <img src={require('../../../style/imgs/layout5.png')} alt="avatar" style={{ width: '100%' }} />
                                }
                            </a>
                        </Col>
                        <Col span={3}>
                            <a href="javascript:;" onClick={() => this.handleClick(6)}>
                                {layout[5]
                                    ? <img src={require('../../../style/imgs/layout6_click.png')} alt="avatar" style={{ width: '100%' }} />
                                    : <img src={require('../../../style/imgs/layout6.png')} alt="avatar" style={{ width: '100%' }} />
                                }
                            </a>
                        </Col>
                    </Row>
                    <div className="layout-text">设置视频</div>
                    {layoutContent}

                </Modal>
            </div>
        );
    }
}
export default connectAlita()(AddLayoutModal);