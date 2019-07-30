import { Tabs } from 'antd';
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import LiveBasicPage from './livebasicinfo/LiveBasicPage'
import LiveConditionPage from './livecondition/LiveConditionPage'
import LiveRightPage from './liveright/LiveRightPage'
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
                <TabPane tab="基本设置" key="1">
                    <LiveBasicPage/>
                </TabPane>
                <TabPane tab="引导界面设置 " key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="直播页面设置" key="3">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="观看条件设置" key="4">
                    <LiveConditionPage/>
                </TabPane>
                <TabPane tab="服务设置" key="5">
                    Content of Tab Pane 5
                </TabPane>
                <TabPane tab="版权安全设置" key="6">
                    Content of Tab Pane 6
                </TabPane>
                <TabPane tab="权限安全设置" key="7">
                    <LiveRightPage/>
                </TabPane>
            </Tabs>
            </div>
        );
    }
}
export default LiveSetting

