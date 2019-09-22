import { Table, Divider, message, Dropdown, Menu, Icon, Popconfirm } from 'antd'
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { withRouter, Link } from 'react-router-dom';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';

class LiveTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            selectedRecord: {} //操作的record
        }
        this.handleLink = this.handleLink.bind(this);
        this.handleSetting = this.handleSetting.bind(this);
        this.handleControl = this.handleControl.bind(this);

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
                        <a className="live-link" href="http://" onClick={(e) => this.handleLink(e, record)}>链接</a>
                        <Divider type="vertical" />
                        <a className="live-link" href="http://" onClick={(e) => this.handleControl(e, record)}>控制台</a>
                        <Divider type="vertical" />
                        <a className="live-link" href="http://" onClick={(e) => this.handleSetting(e, record)}>设置</a>
                        <Divider type="vertical" />
                        <Dropdown className="live-link" onClick={(e) => this.handleDropdownClick(e, record)} overlay={this.menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                更多<Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
            },
        ]

        this.menu = (
            <Menu className="live-link" >
                <Menu.Item>
                    <Link to="/director/?did=1244" target="_blank">导播台直播</Link>
                </Menu.Item>
                <Menu.Item>
                    <Popconfirm
                        title="确认关闭该直播间?"
                        onConfirm={(e, record) => this.handleChangeState(e, this.state.selectedRecord)}
                        okText="确认"
                        cancelText="取消"
                    >
                        {this.state.selectedRecord.status === 3 ? '开启直播间' : '关闭直播间'}
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item>
                    <Popconfirm
                        title="删除后将无法恢复，确认删除该直播间?"
                        onConfirm={(e, record) => this.handleDelete(e, this.state.selectedRecord)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a className="live-link" href="http://">删除直播间</a>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
    }

    componentDidMount() {
        if (!checkUserInfo(this.props.history)) {
            return;
        }
        var user = getLocalStorage('user');
        this.setState({
            isLoading: true
        })
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
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

    handleLink(e, record) {
        e.preventDefault();
        this.props.setAlitaState({
            stateName: 'live_url_modal',
            data: {
                visible: true,
                liveData: record
            }
        })
    }
    handleSetting(e, record) {
        e.preventDefault();
        this.props.history.push('/app/mylive/livesetting/' + record.lid);
        this.props.setAlitaState({
            stateName: 'live_setting_page',
            data: {
                liveData: record
            }
        })


    }

    handleControl(e, record) {
        e.preventDefault();
        this.props.history.push('/app/mylive/controlpanel/' + record.lid);
        this.props.setAlitaState({
            stateName: 'live_control_page',
            data: {
                liveData: record
            }
        })
    }

    handleDropdownClick(e, record) {
        e.preventDefault();
        console.log('record', record)
        this.setState({
            selectedRecord: record
        })
    }

    handleDelete = (e, record) => {
        e.preventDefault();
        console.log('record', record);
        if (!checkUserInfo(this.props.history)) {
            return;
        }
        var user = getLocalStorage('user');
        VCloudAPI.delete('/com/' + user.cid + '/liverooms/?aid=' + user.aid
            + '&lid=' + record.lid,
        ).then(response => {
            if (response.status === 200 && response.data.code === 200) {
                message.success('删除成功');
            } else {
                message.error('删除直播间失败!');
            }
        }).catch((e) => {
            message.error('删除直播间失败!');
        })
    }

    handleChangeState = (e, record) => {
        e.preventDefault();
        if (!checkUserInfo(this.props.history)) {
            return;
        }
        var nextStatus = 2;
        switch (record.status) {
            case 1:
                message.error('无法关闭正在进行的直播');
                return;
            case 2:
                nextStatus = 3;
                break;
            case 3:
                nextStatus = 2;
                break;
            default:
        }
        var user = getLocalStorage('user');
        VCloudAPI.put('/com/' + user.cid + '/room_status/?aid=' + user.aid
            + '&lid=' + record.lid, {
            status: nextStatus
        }
        ).then(response => {
            if (response.status === 200 && response.data.code === 200) {
                message.success('变更状态成功');
            } else {
                message.error('变更状态失败!');
            }
        }).catch((e) => {
            message.error('变更状态失败!');
        })
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
                    loading={this.state.isLoading}
                    dataSource={data}
                    columns={this.columns}
                    bordered
                    size="large"
                    rowKey="lid"
                />
            </div>
        );
    }
}

export default connectAlita()(withRouter(LiveTable));