import React from 'react';
import { Table, Divider, message, Dropdown, Menu, Icon, Popconfirm } from 'antd'
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { withRouter, Link } from 'react-router-dom';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';

class AccountTable extends React.Component {

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
                title: '子账号id',
                dataIndex: 'aid',
                align: 'center',
                render: (text) => { return text }
            },
            {
                title: '子账号名',
                dataIndex: 'name',
                align: 'center',
                render: (text) => { return text }
            }, {
                title: '子账号Email',
                dataIndex: 'email',
                align: 'center',
            }, {
                title: '权限管理',
                dataIndex: 'permission',
                align: 'center',
                render: (text, record) =>
                    <div className="operation-item">
                        <a className="live-link" href="http://" onClick={(e) => this.handleAuthUpdate(e, record)}>权限变更</a>
                    </div>
            }, {
                title: '资源管理',
                dataIndex: 'resource',
                align: 'center',
                render: (text, record) =>
                    <div className="operation-item">
                        <a className="live-link" href="http://" onClick={(e) => this.handleSetting(e, record)}>资源管理</a>
                    </div>
            },
            {
                title: '操作',
                dataIndex: 'operation',
                align: 'center',
                render: (text, record) =>
                    <div className="operation-item">
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
                    <Popconfirm
                        title="确认重置账户密码?"
                        onConfirm={(e, record) => this.handleResetPWD(e, this.state.selectedRecord)}
                        okText="确认"
                        cancelText="取消"
                    >
                        重置密码
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item>
                    <Popconfirm
                        title="删除后将无法恢复，确认删除该账户?"
                        onConfirm={(e, record) => this.handleDelete(e, this.state.selectedRecord)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a className="live-link" href="http://">删除账户</a>
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
                        stateName: 'my_account_list',
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
    handleAuthUpdate(e, record) {
        e.preventDefault();
        this.props.setAlitaState({
            stateName: 'auth_update',
            data: {
                visible:true,
                accountData: record
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
    }

    handleResetPWD = (e, record) => {
        e.preventDefault();
    }

    compare = (property) => {
        return function (obj1, obj2) {
            var value1 = Date.parse(obj1[property]);
            var value2 = Date.parse(obj2[property]);
            return value2 - value1;// 升序
        }
    }

    render() {
        const { my_account_list } = this.props.alitaState;
        var { data = [] } = my_account_list || {};
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
export default connectAlita()(withRouter(AccountTable));



