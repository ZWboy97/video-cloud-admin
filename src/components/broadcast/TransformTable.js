import React from 'react';
import { Table, Icon, Button } from 'antd';


class TransformTable extends React.Component {

    columns = [{
        title: '房间 ID',
        dataIndex: 'id',
        align: 'center',
        render: text => <span>{text}</span>,
    }, {
        title: 'APP',
        dataIndex: 'app',
        align: 'center',
        render: text => <span>{text}</span>,
    }, {
        title: '推流地址',
        dataIndex: 'vhost',
        align: 'center',
        //todo
        render: (text, record) => <span>rtmp://39.106.194.43:1935/{record.app}/{text}</span>,
    }, {
        title: '状态',
        dataIndex: 'clients',
        align: 'center',
        render: clients => <span>{clients > 0 ? '有流' : '无流'}</span>
    }, {
        title: '转码',
        dataIndex: 'clients',
        align: 'center',
    },
    {
        title: '转码地址',
        dataIndex: 'id',
        align: 'center',
        render: (id, record) => <span>rtmp://39.106.194.43:1935/{record.app}/{id}_trans</span>
    }, {
        title: '操作',
        align: 'center',
        render: (text, record) => (
            record.publish.active ? (
                <span>
                    <a href={'http://39.106.194.43:8090/Live360WebPlayer/Live360Player.html?appname='
                        + record.app + '&id=' + record.name} target='_blank' rel='noopener noreferrer'>
                        <Button>预览</Button>
                    </a>
                    <span className="ant-divider" />
                    <Button onClick={() => this.props.kickoff(record.publish.cid)}>踢流</Button>
                    <span className="ant-divider" />
                </span>)
                :
                (<span></span>)
        ),
    }];

    render() {
        return (
            <Table columns={this.columns} dataSource={this.props.streams} />
        )
    }
}

export default TransformTable;