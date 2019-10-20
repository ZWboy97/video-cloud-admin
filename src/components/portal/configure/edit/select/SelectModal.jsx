import React from 'react';
import { connectAlita } from 'redux-alita';
import { Modal, Tabs } from 'antd';
const { TabPane } = Tabs;



class SelectModal extends React.Component {

    handleCancel = () => {
        this.setVisible(false);
    }

    handleOk = () => {

    }

    getAlitaStateDate() {
        const { portal_add_modal } = this.props.alitaState || {};
        const alitaData = portal_add_modal ? portal_add_modal.data : {};
        return alitaData;
    }

    setVisible = (value) => {
        this.props.setAlitaState({
            stateName: "portal_add_modal",
            data: {
                visible: value
            }
        })
    }


    render() {
        const alitaData = this.getAlitaStateDate();
        return (
            <div>
                <Modal
                    title="添加条目"
                    visible={alitaData.visible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="选择已有直播" key="1">
                            从用户已有的直播中选择一个
                        </TabPane>
                        <TabPane tab="选择已有点播" key="2">
                            从用户已有的点播中选择一个
                        </TabPane>
                        <TabPane tab="文本图片链接" key="3">
                            用户编辑一个带有图片的跳转链接
                        </TabPane>
                    </Tabs>
                </Modal>
            </div >
        )
    }
}

export default connectAlita()(SelectModal);