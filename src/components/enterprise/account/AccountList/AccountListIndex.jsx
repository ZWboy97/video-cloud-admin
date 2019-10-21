import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import AccountTable from './AccountTable';
import AccountPanel from './AccountPanel';
import './style.less';
import CreateAccountModal from './CreateAccountModal';
import { connectAlita } from 'redux-alita';
class AccountListIndex extends React.Component {

    render() {
        return (
            <div className="account-page">
                <BreadcrumbCustom first="子账号列表" />
                <div className="acount-panel">
                    <AccountPanel />
                </div>
                <div className="account-table-panel">
                    <CreateAccountModal />
                    <AccountTable />
                </div>
            </div>
        )
    }
}

export default connectAlita()(AccountListIndex);