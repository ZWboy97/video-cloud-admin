import { Tabs } from 'antd';
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import LiveBasicPage from './livebasicinfo/LiveBasicPage'
const { TabPane } = Tabs;

class LiveSetting extends React.Component {
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <div>
            <BreadcrumbCustom first="我的直播" second="直播设置" />
            <Tabs className="setting-content" defaultActiveKey="1" onChange={this.callback} tabPosition={'left'}>
                <TabPane tab="直播详情" key="1">
                    <LiveBasicPage/>
                </TabPane>
                <TabPane tab="控制台 " key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="直播统计" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
            </div>
        );
    }
}
export default LiveSetting

