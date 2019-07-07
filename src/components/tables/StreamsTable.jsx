import React from 'react';
import { Table, Icon, Button } from 'antd';


class StreamsTable extends React.Component {

    columns = [{
        title: '流ID',
        dataIndex: 'id',
        align: 'center',
        render: text => <span>{text}</span>,
    }, {
        title: 'APP',
        dataIndex: 'app',
        align: 'center',
        render: text => <span>{text}</span>,
    }, {
        title: '流名称',
        dataIndex: 'name',
        align: 'center',
        render: (text) => <span>{text}</span>
    }, {
        title: 'Vhost',
        dataIndex: 'vhost',
        align: 'center',
    }, {
        title: '流状态',
        dataIndex: 'clients',
        align: 'center',
        render: clients => <span>{clients > 0 ? '有流' : '无流'}</span>
    }, {
        title: '在线人数',
        dataIndex: 'clients',
        align: 'center',
    }, {
        title: '入口带宽',
        dataIndex: 'kbps.recv_30s',
        align: 'center',
        render: kbps => <span>{(kbps / 1000).toFixed(2) + 'Mbps'}</span>
    },
    {
        title: '出口带宽',
        dataIndex: 'kbps.send_30s',
        align: 'center',
        render: kbps => <span>{(kbps / 1000).toFixed(2) + "Mbps"}</span>
    },
    {
        title: '视频信息',
        dataIndex: 'video',
        align: 'center',
        render: (video) => <span>{
            (video && 'profile' in video) ? video.codec + '/' + video.profile + '/' + video.level : ""
        }</span>
    }, {
        title: '音频信息',
        dataIndex: 'audio',
        align: 'center',
        render: audio => <span>{
            (audio && 'profile' in audio) ? audio.codec + '/' + audio.profile + '/' + audio.sample_rate : ""
        }</span>
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

export default StreamsTable;