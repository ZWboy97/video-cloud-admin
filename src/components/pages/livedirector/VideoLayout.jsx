import React from 'react';
import { connectAlita } from 'redux-alita';
import { Icon } from 'antd';
class VideoLayout extends React.Component {

    constructor(props){
        super(props)
        this.handleAddLayout=this.handleAddLayout.bind(this)
    }

    handleAddLayout(){
        this.props.setAlitaState({
            stateName:'add_layout_modal',
            data:{
                visible:true
            }
        })
    }

    render() {
        return (
            <div>
                <div className="show-layout-set">
                    <a href="javascript:;" onClick={this.handleAddLayout}><Icon type="plus" />新增布局</a>
                </div>
            </div>
        );
    }
}
export default connectAlita()(VideoLayout);