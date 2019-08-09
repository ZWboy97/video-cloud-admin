import {Form, Input, Row, Col, Upload, Icon, Button, message, Modal} from 'antd';
import React, {Component} from 'react';
import {connectAlita} from 'redux-alita';
import {TESTJYLAPI} from '../../../axios/api'
const props = {

}
class DeleteList extends Component {
    constructor(props) {
        super(props)
        // console.log('props',props)
    }

    handleClick =()=> {
        const {rowSelectedInfo = {}} = this.props.alitaState
        console.log('rowSel',rowSelectedInfo)
        const {data_source = {}} = this.props.alitaState;
        console.log('data_src',data_source)
        if (typeof (rowSelectedInfo) !== 'undefined'&&typeof (rowSelectedInfo.data) !== 'undefined'&&typeof (rowSelectedInfo.data.selectedRows) !== 'undefined') {

            for (var i = 0;i < rowSelectedInfo.data.selectedRowKeys.length;i++) {
                data_source.data.splice(rowSelectedInfo.data.selectedRowKeys[i],1)
                let data = {
                    aid:'test',
                    rid:rowSelectedInfo.data.selectedRows[i].rid,
                }
                console.log('data-to-send',data)
                console.log('com/test/resourses/?aid='+data.aid+'rid='+data.rid)
                TESTJYLAPI.delete('com/test/resourses/?aid='+data.aid+'&rid='+data.rid)
            }
            this.props.setAlitaState({
                stateName: 'data_source',
                data:data_source.data
            })

        }
    }
    render() {
        return (
            <div>
                <Button type="primary" size='large' icon="delete" onClick={this.handleClick}>
                    删除视频
                </Button>
            </div>
        )
    }
}

export default connectAlita()(DeleteList);