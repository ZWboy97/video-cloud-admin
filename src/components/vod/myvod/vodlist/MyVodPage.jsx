import React from 'react';
import BreadcrumbCustom from './../../../BreadcrumbCustom';
import VodList from './VodList';
import HeaderPanel from './HeaderPanel';
import './style.less';
import CreateVodModal from './CreateVodModal';
import { connectAlita } from 'redux-alita';



/**
 * 我的直播界面,展示已经创建的直播列表
 * @author JiaChang.Li
 */
class MyLivesPage extends React.Component {

    render() {
        return (
            <div className="live-page">
                <BreadcrumbCustom first="我的点播" />
                <div className="header-panel">
                    <HeaderPanel />
                </div>
                <div className="live-table-panel">
                    <CreateVodModal />
                    <VodList />
                </div>
            </div>
        )
    }
}

export default connectAlita()(MyLivesPage);