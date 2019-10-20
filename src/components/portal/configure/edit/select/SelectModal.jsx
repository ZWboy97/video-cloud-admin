import React from 'react';
import { connectAlita } from 'redux-alita';
import { Modal, Tabs } from 'antd';
import SelectFromLive from './SelectFromLive';
import SelectFromVod from './SelectFromVod';
import PicTextItem from './PicTextItem';
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
                ...this.getAlitaStateDate(),
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
                    footer={null}
                    width={"70%"}
                >
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="选择已有直播" key="1">
                            <SelectFromLive></SelectFromLive>
                        </TabPane>
                        <TabPane tab="选择已有点播" key="2">
                            <SelectFromVod></SelectFromVod>
                        </TabPane>
                        <TabPane tab="文本图片链接" key="3">
                            <PicTextItem></PicTextItem>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div >
        )
    }
}

export default connectAlita()(SelectModal);