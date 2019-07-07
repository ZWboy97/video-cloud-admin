import React from 'react';
import { Table, Icon, Button } from 'antd';
import { secondToString } from '../../utils/index'





class ClientsTable extends React.Component {

    columns = [
        {
            title: '标识ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: text => <span>{text}</span>,
        }, {
            title: 'IP地址',
            dataIndex: 'ip',
            align: 'center',
            key: 'ip',
        }, {
            title: 'Vhost ID',
            dataIndex: 'vhost',
            align: 'center',
            key: 'vhost',
        }, {
            title: '流 ID',
            dataIndex: 'stream',
            align: 'center',
            key: 'stream',
        }, {
            title: 'Client 类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: text => <span>{text == 'fmle-publish' ? '推流' : '播放'}</span>,
        }, {
            title: '在线时长',
            dataIndex: 'alive',
            key: 'alive',
            align: 'center',
            render: second => <span>{secondToString(second / 1000)}</span>
        },
        {
            title: '路径地址',
            dataIndex: 'tcUrl',
            key: 'tcUrl',
            align: 'center',
            render: url => <span>{
                url.length < 35 ? url : url.substring(0, 35) + '...'
            }</span>
        }, {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <span>
                    <Button onClick={() => this.props.kickoff(record.id)}>踢Ta</Button>
                </span>
            ),
        }];

    render() {
        return (
            <Table columns={this.columns} dataSource={this.props.data} />
        )
    }

}

export default ClientsTable;