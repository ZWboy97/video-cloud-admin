import { Table } from 'antd'
import React from 'react';

class LiveTable extends React.Component {

    render() {


        return (
            < div >
                <Table
                    dataSource={data}
                    columns={columns}
                    bordered={true}
                    size='small'
                />
            </div >
        );
    }

}

// 直播表格表头
const columns = [
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
    },
]

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

export default LiveTable;