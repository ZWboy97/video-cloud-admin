import React, { Component } from 'react'
import { Button, } from 'antd';
import './style.less';
import { connectAlita } from 'redux-alita';

class HeaderEdit extends Component {


    handleEdit(button_value) {
        console.log('click button')
        if(button_value===1){
            this.props.setAlitaState({
                stateName: 'edit_info',
                data: {
                    button_content: "保存修改",
                    button_value:2,
                    disable: false,
                }
            })
        }
        else if(button_value===2){
            this.props.setAlitaState({
                stateName: 'edit_info',
                data: {
                    button_content: "修改信息",
                    button_value:1,
                    disable: true,
                }
            })
        }
        
        
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