import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message } from 'antd';
import './style.less';

class PortalEditIndex extends React.Component {
    render() {
        return (
            <div className="portal-edit-index-container">
                <BreadcrumbCustom first="配置门户" />
                <div className="edit-content-container">
                    这里是一些配置界面
                </div>
            </div>)
    }
}

export default PortalEditIndex;
