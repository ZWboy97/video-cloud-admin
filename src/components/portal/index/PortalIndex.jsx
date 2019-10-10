import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message } from 'antd';
class AccountCenter extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="视频门户" />
            </div>)
    }
}

export default AccountCenter;
