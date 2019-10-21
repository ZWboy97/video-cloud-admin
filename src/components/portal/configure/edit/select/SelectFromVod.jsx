import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
import { List, message, Tag, Row, Col, Divider } from 'antd';

class SelectFromVod extends React.Component {

    componentDidMount() {
        if (!checkUserInfo(this.props.history)) {//检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.get("/com/" + user.cid + '/videolist/', {

        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                console.log(data)
                if (code === 200) {
                    this.props.setAlitaState({
                        stateName: 'vod_list_content',
                        data: {
                            "videoInfo": data ? data : []
                        }
                    });
                    console.log(data);
                } else {
                    message.error('获取列表失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
            message.error('获取列表失败!')
        })
    }

    handleSelect = (e, record) => {
        e.preventDefault();
        console.log('select vod', record);
        const newItem = {
            title: record.name,
            type: 'vod',
            pic_url: record.pic_url,
            link_url: record.display_url,
            rid: record.rid,
            intro: record.intro,
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


    render() {
        const { vod_list_content = {} } = this.props.alitaState || {};
        const { data = {} } = vod_list_content || {}
        const { videoInfo = [] } = data || {}
        return (
            <Row>
                <Col span={20} offset={2}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={videoInfo}
                        renderItem={item => (
                            <div>
                                <Row>
                                    <Col span={4}>
                                        <img src={item.pic_url} alt="avatar" style={{ width: '100%', height: '90px' }} />
                                    </Col>
                                    <Col span={16} offset={1}>
                                        <div className="top-show">
                                            <span className="video-name">{item.name}</span>
                                            <span className="video-time">{item.time}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <span className="video-intro">{item.label.map(tag => (
                                                <Tag
                                                    key={tag}
                                                    color={"blue"}
                                                >
                                                    {tag}
                                                </Tag>
                                            ))}</span>
                                        </div>
                                        <div className="video-intro">{item.intro}</div>
                                    </Col>
                                    <Col span={2}>
                                        <div className="action">
                                            <a href="http://"
                                                onClick={(e) => this.handleSelect(e, item)}
                                            >选择</a>
                                        </div>
                                    </Col>
                                </Row>
                                <Divider />
                            </div>
                        )}
                    />
                </Col>
            </Row>
        );
    }
}


export default connectAlita()(SelectFromVod);