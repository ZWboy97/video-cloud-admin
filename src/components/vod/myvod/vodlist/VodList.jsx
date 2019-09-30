import React from 'react';
import { connectAlita } from 'redux-alita';
import InfiniteScroll from 'react-infinite-scroller';
import { List, message, Tag, Row, Col, Icon, Divider } from 'antd';
import { VCloudAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
import './style.less';


// const IconText = ({ type, text }) => (
//     <span>
//         <Icon type={type} style={{ marginRight: 8 }} />
//         {text}
//     </span>
// );

//测试的数据
class VodList extends React.Component {
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
                    // 向用户直播列表中添加一个记录
                    message.success('成功获取点播列表')
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
        })
    }


    render() {

        const { vod_list_content = {} } = this.props.alitaState || {};
        const { data = {} } = vod_list_content || {}
        console.log('data', data)
        const { videoInfo = [] } = data || {}


        console.log('videoinfo', videoInfo)

        return (
            <Row>
                <Col span={20} offset={2}>
                    <div className="infinite-container">

                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 5,
                            }}
                            dataSource={videoInfo}
                            renderItem={item => (
                                <div>
                                    <Row>
                                        <Col span={4}>
                                            <img src={item.pic_url} alt="avatar" style={{ width: '100%', height: '90px' }} />
                                        </Col>
                                        <Col span={13} offset={1}>
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
                                        <Col span={6}>
                                            <div className="action">
                                                <a href="javascript:;">删除</a>
                                                <Divider type="vertical" />
                                                <a href="javascript:;">设置</a>
                                                <Divider type="vertical" />
                                                <a href="javascript:;">预览</a>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Divider />
                                </div>
                            )}
                        />

                        <div style={{ float: "left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }} />

                    </div >
                </Col>
            </Row>
        );
    }
}

export default connectAlita()(VodList);