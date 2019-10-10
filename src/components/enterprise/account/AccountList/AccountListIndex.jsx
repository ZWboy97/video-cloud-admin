import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message } from 'antd';
class AccountListIndex extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="子账号列表" />
            </div>)
    }
}

export default AccountListIndex;
