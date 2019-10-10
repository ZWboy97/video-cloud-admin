import { Tabs, message } from 'antd';
import React from 'react';
import { connectAlita } from 'redux-alita';
import { withRouter } from 'react-router-dom';
import { VCloudAPI } from 'myaxios/api';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import BasicVodSetting from './BasicVodSetting';

const { TabPane } = Tabs;

class LiveSetting extends React.Component {

    componentDidMount() {
        if (!checkUserInfo(this.props.history)) {//检查用户信息是否完整
            return;
        }
        const rid = this.props.match.params.rid;
        const user = getLocalStorage('user');
        console.log(rid)
    }

    callback(key) {
        console.log(key);
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom first="我的点播" second="点播设置" />
                <Tabs className="setting-content" defaultActiveKey="1" onChange={this.callback} tabPosition={'left'}>
                    <TabPane tab="基本设置" key="1">
                        <BasicVodSetting></BasicVodSetting>
                    </TabPane>
                    <TabPane tab="其他设置 " key="2">
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default withRouter(connectAlita()(LiveSetting));

