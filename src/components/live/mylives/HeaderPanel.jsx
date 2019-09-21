import React, { Component } from 'react'
import { Button, Statistic, } from 'antd';
import './style.less';
import { connectAlita } from 'redux-alita';
import { joinSafe } from 'upath';

class HeaderPanel extends Component {


    handleCreateLive(e) {
        console.log('click create button')
        this.props.setAlitaState({
            stateName: 'create_live_modal',
            data: {
                visible: true,
                loading: false
            }
        })
    }

    render() {
        const { my_live_list } = this.props.alitaState;
        var { data = [] } = my_live_list || {};
        var count = 0;
        if (data) {
            count = data.length;
        }
        console.log('alitastate in panel', this.props.alitaState)
        return (
            <div className="header-panel">
                <Statistic className="total-number" title="总频道数" value={20} />
                <Statistic className="current-number" title="当前数目" value={count} />
                <Button className="create-button" type="primary"
                    onClick={(e) => this.handleCreateLive(this)}
                >创建直播</Button>
            </div>
        )
    }
}

export default connectAlita()(HeaderPanel);