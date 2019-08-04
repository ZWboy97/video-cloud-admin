import { Table, Divider, message } from 'antd'
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../../axios/api';
import { withRouter } from 'react-router-dom';
import { getLocalStorage } from '../../../utils/index';
import { checkUserInfo } from '../../../utils/UserUtils';

class LiveTable extends React.Component {

    state = {
        isLoading: false,

    }

    constructor(props) {
        super(props);
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
                    if (value === 'none') {
                        return '公开';
                    } else if (value === 'code') {
                        return '验证码';
                    } else if (value === 'pay') {
                        return '支付';
                    } else if (value === 'login') {
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
                    <div>
                        <a className="live-link" href="javascript:;" onClick={(e) => this.handleLink(e, record)}>链接</a>
                        <Divider type="vertical" />
                        <a className="live-link" href="javascript:;" onClick={(e) => this.handleSetting(e, record)}>设置</a>
                        <Divider type="vertical" />
                        <a className="live-link" href="javascript:;" onClick={(e) => this.handleControl(e, record)}>控制台</a>
                    </div>
            },
        ]
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
        this.props.history.push('/app/lives/mylives/setting/');
        this.props.setAlitaState({
            stateName: 'live_setting_page',
            data: {
                liveData: record
            }
        })
    }

    handleControl(e, record) {
        e.preventDefault();
        this.props.history.push('/app/lives/mylives/controlpanel/');
        this.props.setAlitaState({
            stateName: 'live_setting_page',
            data: {
                liveData: record
            }
        })
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

    compare = (property) => {
        return function (obj1, obj2) {
            var value1 = Date.parse(obj1[property]);
            var value2 = Date.parse(obj2[property]);
            return value2 - value1;     // 升序
        }
    }


    render() {
        const { my_live_list } = this.props.alitaState;
        var { data = [] } = my_live_list || {};
        data.sort(this.compare('create_time'));
        return (
            <div>
                <Table
                    loading={this.state.isLoading}
                    dataSource={data}
                    columns={this.columns}
                    bordered={true}
                    size='large'
                    rowKey='lid'
                />
            </div>
        );
    }
}

export default connectAlita()(withRouter(LiveTable));