import React, { Component } from 'react'
import { Button, message} from 'antd';
import './style.less';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';

class HeaderEdit extends Component {


    handleEdit() {
        const { live_setting_page = {} } = this.props.alitaState || {};
        const { liveData = {} } = live_setting_page.data || {};
        console.log(liveData);

        const data = (({end_time,kind,lid,name,permission,size,start_time}) => ({end_time,kind,lid,name,permission,size,start_time}))(liveData)
        console.log(data)
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liverooms/?aid='+user.aid, {
            ...data
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                if (code === 200) {
                    message.success('修改成功!');
                    
                } else {
                    message.error('修改失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        })
    }
        

    render() {
        console.log('alitastate in panel', this.props.alitaState)
        const { edit_info = {} } = this.props.alitaState;
        const { data } = edit_info;
        const { button_content='修改信息', button_value = 1 } = data || {};
        return (
            <div className="header-edit">
                <Button className="edit-button" type="primary"
                    onClick={(e) => this.handleEdit(button_value)}
                >{button_content}</Button>
            </div>
        )
    }
}

export default connectAlita()(HeaderEdit);