import React from 'react';
import { Table } from 'antd';

class ServesTable extends React.Component {

    render() {

        const data = mockdata;
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }

}

export default ServesTable;

const columns = [
    {
        title: '服务名称',
        dataIndex: 'name',
        align: 'center',
    }, {
        title: '计费方案',
        dataIndex: 'bill_way',
        align: 'center',
    }, {
        title: '操作者',
        dataIndex: 'operator',
        align: 'center',
    },
    {
        title: '创建时间',
        dataIndex: 'time',
        align: 'center',
    },
]

const mockdata = [
    {
        name: "云导播服务",
        bill_way: "按时长计费",
        operator: "23985473234",
        time: "2019-08-08",
    },
    {
        name: "转码服务",
        bill_way: "按时长计费",
        operator: "23985473234",
        time: "2019-08-09",
    }
]