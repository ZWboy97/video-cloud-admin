import React from 'react';
import { Table } from 'antd';

class BillTable extends React.Component {
    render() {
        const data = mockdata;
        return (
            <div>
                <Table columns={columns} dataSource={data} />

            </div>
        )
    }
}

export default BillTable;

const columns = [
    {
        title: '时间',
        dataIndex: 'time',
        align: 'center',
    },
    {
        title: '类型',
        dataIndex: 'kind',
        align: 'center',
        render: (value) => {
            if (value === 'in') {
                return "流入";
            } else if (value === 'out') {
                return "流出";
            } else {
                return "未知";
            }
        }
    },
    {
        title: '金额',
        dataIndex: 'count',
        align: 'center',
    },
    {
        title: '产品名称',
        dataIndex: 'name',
        align: 'center',
    }, {
        title: '产品明细',
        dataIndex: 'detail',
        align: 'center',
    },
    {
        title: '账单编号',
        dataIndex: 'id',
        align: 'center',
    },
]

const mockdata = [
    {
        time: "2019-08-08",
        kind: "in",
        count: 23,
        name: "直播",
        detail: "[基础直播+转码+录制+导播]服务，时长78分钟",
        id: "72374985769274"
    },
    {
        time: "2019-08-08",
        kind: "out",
        count: 23,
        name: "直播",
        detail: "[基础直播+转码+录制+导播]服务，时长78分钟",
        id: "72374985769274"
    }
]