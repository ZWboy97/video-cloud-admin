import React from 'react';
import { Row, Col } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import LiveTable from './LiveTable';
import HeaderPanel from './HeaderPanel';
import './style.less';
import CreateLiveModal from './CreateLiveModal';
import CreateLinkModal from './LiveUrlModal';
import { connectAlita } from 'redux-alita';



/**
 * 我的直播界面,展示已经创建的直播列表
 * @author JiaChang.Li
 */
class MyLivesPage extends React.Component {

    render() {
        return (
            <div className="live-page">
                <BreadcrumbCustom first="我的直播" />
                <div className="header-panel">
                    <HeaderPanel />
                </div>
                <div className="live-table-panel">
                    <CreateLiveModal></CreateLiveModal>
                    <CreateLinkModal></CreateLinkModal>
                    <LiveTable></LiveTable>
                </div>
            </div>
        )
    }
}

export default connectAlita()(MyLivesPage);