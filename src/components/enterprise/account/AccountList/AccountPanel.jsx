import React, { Component } from 'react'
import { Button, Statistic, } from 'antd';
import './style.less';
import { connectAlita } from 'redux-alita';
import { joinSafe } from 'upath';
class AccountPanel extends Component{
    handleCreateAccount(e) {
        console.log('click create button')
        this.props.setAlitaState({
            stateName: 'create_account_modal',
            data: {
                visible: true,
                loading: false
            }
        })
    }
    render() {
        const { my_account_list } = this.props.alitaState;
        var { data = [] } = my_account_list || {};
        var count = 0;
        if (data) {
            count = data.length;
        }
        console.log('alitastate in panel', this.props.alitaState)
        return (
            <div className="account-panel">
               <Statistic className="total-number" title="子账号数目" value={20} />
                <Statistic className="current-number" title="当前数目" value={count} />
                <Button className="create-button" type="primary" 
                    onClick={(e) => this.handleCreateAccount(this)}
                >创建子账号</Button>
            </div>
        )
    }
}
export default connectAlita()(AccountPanel);