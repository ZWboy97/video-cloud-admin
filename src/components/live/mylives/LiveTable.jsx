import { Table, Divider, Button} from 'antd'
import React from 'react';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../axios/api'
import { Link, withRouter } from 'react-router-dom';

class LiveTable extends React.Component {

    constructor(props) {
        super(props);
        this.handleLink=this.handleLink.bind(this);
        this.handleSetting=this.handleSetting.bind(this);

        this.columns = [
            {
                title: '频道号',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                render: (text) => { return "hahha" }
            }, {
                title: '直播名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            }, {
                title: '分类',
                dataIndex: 'kind',
                key: 'kind',
                align: 'center',
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                align: 'center',
            }, {
                title: '观看条件',
                dataIndex: 'auth',
                key: 'auth',
                align: 'center',
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'center',
                render: (text)=>
                <div>       
                     <a className="live-link" href="javascript:;" onClick={this.handleLink}>链接</a>
                     <Divider type="vertical" />
                     <a className="live-link" href="javascript:;" onClick={this.handleSetting}>设置</a>
                </div>
            },
        ]
    }
    handleLink(e) {
        e.preventDefault();
        console.log("click create button");
        this.props.setAlitaState({
            stateName: 'create_link_modal',
            data: {
                visible: true
            }
        })
    }
    handleSetting(e) {
        console.log('click setting button')
        this.props.history.push('/app/lives/mylives/details/') ;
        // this.props.setAlitaState({
        //     stateName: 'create_link_modal',
        //     data: {
        //         visible: true,
        //         loading: false
        //     }
        // })
    }

    render() {


        return (
            < div >
                <Table
                    dataSource={data}
                    columns={this.columns}
                    bordered={true}
                    size='small'
                />
            </div >
        );
    }


    

}

// 直播表格表头


const data = [
    {
        key: '1',
        id: '000001',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '2',
        id: '000002',
        name: '直播名称',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '3',
        id: '000003',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '4',
        id: '000004',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '5',
        id: '000005',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '6',
        id: '000001',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '7',
        id: '000007',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '8',
        id: '000008',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    }, {
        key: '9',
        id: '000009',
        name: '第一个直播',
        kind: '全景直播',
        status: '未进行',
        auth: '无',
        operation: '无'
    },
]

export default connectAlita()(withRouter(LiveTable));