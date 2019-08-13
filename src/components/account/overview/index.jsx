import React from 'react';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { message } from 'antd';
import HeaderPanel from './HeaderPanle';
import ContentPanel from './ContentPanel';
import './style.less';
class AccountCenter extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="账户总览" />
                <HeaderPanel />
                <ContentPanel className="content-panel" />
            </div>)
    }
}

export default AccountCenter;
