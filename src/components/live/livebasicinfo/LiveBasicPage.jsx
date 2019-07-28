import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {Row, Col} from 'antd';
import LiveInfo from './LiveInfo';
import HeaderEdit from './HeaderEdit';
import './style.less';
import { connectAlita } from 'redux-alita';



/**
 * 我的直播信息及设置界面,展示已经创建的直播列表
 */
class LiveSettingPage extends React.Component {
  
    render() {
        console.log('LiveSettingPage')
        return (
            <div className="live-page">
                <div className="header-panel">
                    <HeaderEdit />
                </div>
                <div className="live-info-panel">
                    <LiveInfo />
                </div>
            </div>
        )
    }
}

export default connectAlita()(LiveSettingPage);