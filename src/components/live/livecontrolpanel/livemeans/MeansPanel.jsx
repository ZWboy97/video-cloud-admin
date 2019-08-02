import { Tabs } from 'antd';
import React from 'react';
import Lead from './Lead';
import List from './List'
import Professional from './Professional'
import Pull from './Pull'
const { TabPane } = Tabs;

class MeansPanel extends React.Component {
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <div>
               
                <Tabs defaultActiveKey="1" onChange={this.callback} tabPosition={'top'}>
                    <TabPane tab="专业设备直播" key="1">
                        <Professional />
                    </TabPane>
                    <TabPane tab="拉流直播 " key="2">
                        <Pull />
                    </TabPane>
                    <TabPane tab="列表直播" key="3">
                        <List />
                    </TabPane>
                    <TabPane tab="导播台直播" key="4">
                        <Lead />
                    </TabPane>
                    
                </Tabs>
            </div>
        );
    }
}
export default MeansPanel

