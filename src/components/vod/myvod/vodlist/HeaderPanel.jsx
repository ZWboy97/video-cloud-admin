import React, { Component } from 'react'
import { Button, Statistic, } from 'antd';
import './style.less';
import { connectAlita } from 'redux-alita';

class HeaderPanel extends Component {


    handleCreateLive(e) {
        console.log('click create button')
        this.props.setAlitaState({
            stateName: 'create_vod_modal',
            data: {
                visible: true,
                loading: false
            }
        })
    }

    render() {
        const { vod_list_content = {} } = this.props.alitaState || {};
        const { data = {} } = vod_list_content || {}
        const { videoInfo } = data;
        const count = videoInfo ? videoInfo.length : 0;
        return (
            <div className="header-panel">
                <Statistic className="total-number" title="总频道数" value={20} />
                <Statistic className="current-number" title="当前数目" value={count} />
                <Button className="create-button" type="primary"
                    onClick={(e) => this.handleCreateLive(this)}
                >创建点播</Button>
            </div>
        )
    }
}

export default connectAlita()(HeaderPanel);