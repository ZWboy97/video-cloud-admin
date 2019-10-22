import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
import { Table, message } from 'antd'

class SelectFromLive extends React.Component {


    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '频道号',
                dataIndex: 'lid',
                align: 'center',
                render: (text) => { return text }
            }, {
                title: '直播名称',
                dataIndex: 'name',
                align: 'center',
            }, {
                title: '分类',
                dataIndex: 'kind',
                align: 'center',
                render: (value) => {
                    switch (value) {
                        case 1:
                            return '普通';
                        case 2:
                            return '全景';
                        default: return '普通';
                    }
                }
            }, {
                title: '状态',
                dataIndex: 'status',
                align: 'center',
                render: (value) => {
                    switch (value) {
                        case 1:
                            return '进行中';
                        case 2:
                            return '未进行';
                        case 3:
                            return '已关闭';
                        default: return '未知'
                    }
                }
            }, {
                title: '观看条件',
                dataIndex: 'permission',
                align: 'center',
                render: (value) => {
                    console.log('permission', value)
                    if (value === 1) {
                        return '公开';
                    } else if (value === 2) {
                        return '验证码';
                    } else if (value === 3) {
                        return '支付';
                    } else if (value === 4) {
                        return '登录';
                    } else {
                        return '未知';
                    }
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) =>
                    <div className="operation-item">
                        <a className="live-link" href="http://"
                            onClick={(e) => this.handleSelect(e, record)}>
                            选择</a>
                    </div>
            },
        ]
    }

    componentDidMount() {
        if (!checkUserInfo(this.props.history)) {
            return;
        }
        var user = getLocalStorage('user');
        VCloudAPI.get('/com/' + user.cid + '/liverooms/?aid=' + user.aid
        ).then(response => {
            console.log('success：', response.data)
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                if (code === 200) {
                    this.props.setAlitaState({
                        stateName: 'my_live_list',
                        data: data
                    });
                } else {
                    message.error('获取直播列表失败!');
                }
            } else {
                message.error('获取直播列表失败!');
            }
        }).catch((e) => {
            message.error('获取直播列表失败!');
        })
    }

    handleSelect = (e, record) => {
        e.preventDefault();
        console.log('select live', record);
        const newItem = {
            name: record.name,
            type: 'live',
            picture_url: record.picture_url,
            link_url: record.display_url,
            lid: record.lid,
            intro: record.intro,
            start_time: record.start_time,
            end_time: record.end_time,
            permission: record.permission,
            kind: record.kind,
            size: record.size,
            status: record.status
        }
        const { data } = this.props.alitaState.portal_configure_data || {};
        const dataDesc = this.getDataDesc();
        data[dataDesc].unshift(newItem);
        for (var i = 0; i < data[dataDesc].length; i++) {
            data[dataDesc][i].order = i + 1;
        }
        this.props.setAlitaState({
            stateName: 'portal_configure_data',
            data: data,
        })
        message.success('选择成功');
        this.dismissAddModal();
    }

    dismissAddModal() {
        this.props.setAlitaState({
            stateName: 'portal_add_modal',
            data: {
                visible: false
            }
        })
    }

    getDataDesc() {
        const { data } = this.props.alitaState.portal_add_modal || {};
        return data ? data.data_desc : ''
    }

    compare = (property) => {
        return function (obj1, obj2) {
            var value1 = Date.parse(obj1[property]);
            var value2 = Date.parse(obj2[property]);
            return value2 - value1;// 升序
        }
    }


    render() {
        const { my_live_list } = this.props.alitaState;
        var { data = [] } = my_live_list || {};
        data && data.sort(this.compare('create_time'));
        return (
            <div>
                <Table
                    dataSource={data}
                    columns={this.columns}
                    bordered
                    size="large"
                    rowKey="lid"
                    pagination={{
                        pageSize: 6,
                    }}
                />
            </div>
        );
    }

}

export default connectAlita()(SelectFromLive);