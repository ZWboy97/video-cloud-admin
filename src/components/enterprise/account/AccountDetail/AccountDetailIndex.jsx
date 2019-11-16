import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message } from 'antd';
class AccountDetailIndex extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="子账号详情" />
            </div>)
    }
}

export default AccountDetailIndex;
