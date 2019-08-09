import { Tabs,message } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import {withRouter} from 'react-router-dom';
import { VCloudAPI } from '../../../axios/api';
import { getLocalStorage } from '../../../utils/index';
import { checkUserInfo } from '../../../utils/UserUtils';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import LiveBasicPage from './livebasicinfo/LiveBasicPage'
import LiveConditionPage from './livecondition/LiveConditionPage'
import LiveRightPage from './liveright/LiveRightPage'
import LiveIntroPage from './liveintro/LiveIntroPage'
import LiveServePage from './liveserve/LiveServePage'
import LiveCopyrightPage from './livecopyright/LiveCopyrightPage'
import LiveShowPage from './liveshow/LiveShowPage'
const { TabPane } = Tabs;

class LiveSetting extends React.Component {
    
    componentDidMount() {
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const lid = this.props.match.params.lid;
        const user = getLocalStorage('user');
        console.log(lid)
        VCloudAPI.get("/com/" + user.cid + '/liveroom/all_config/?aid='+user.aid+"&lid="+lid, {

        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                console.log(data)
                if (code === 200) {
                    // 向用户直播列表中添加一个记录
                    message.success('获取配置成功')
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
                        data: data
                    });
                    const {live_room_info} =data
                    const liveInfo = { liveData: { ...live_room_info } }
                    this.props.setAlitaState({
                        stateName: 'live_setting_page',
                        data: liveInfo
                    });
                } else {
                    message.error('获取配置失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        })

    }
    callback(key) {
        console.log(key);
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom first="我的直播" second="直播设置" />
                <Tabs className="setting-content" defaultActiveKey="1" onChange={this.callback} tabPosition={'left'}>
                    <TabPane tab="基本设置" key="1">
                        <LiveBasicPage />
                    </TabPane>
                    <TabPane tab="引导界面设置 " key="2">
                        <LiveIntroPage />
                    </TabPane>
                    <TabPane tab="直播页面设置" key="3">
                        <LiveShowPage />
                    </TabPane>
                    <TabPane tab="观看条件设置" key="4">
                        <LiveConditionPage />
                    </TabPane>
                    <TabPane tab="服务设置" key="5">
                        <LiveServePage />
                    </TabPane>
                    <TabPane tab="版权安全设置" key="6">
                        <LiveCopyrightPage />
                    </TabPane>
                    <TabPane tab="权限安全设置" key="7">
                        <LiveRightPage />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default withRouter(connectAlita()(LiveSetting));

