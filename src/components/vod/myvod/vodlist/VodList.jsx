import React from 'react';
import { connectAlita } from 'redux-alita';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Tooltip, Tag, Row, Col, Icon, Divider } from 'antd';
import './style.less';
const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}
const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

//测试的数据
class VodList extends React.Component {



    render() {

        const { vod_list_content = {} } = this.props.alitaState || {};
        const { data = {} } = vod_list_content || {}
        const { videoInfo = [] } = data || {}

        
        console.log(videoInfo)

        return (
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
                        <List.Item
                            key={item.id}
                            actions={[
                                <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                <IconText type="message" text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={250}
                                    height={110}
                                    alt="logo"
                                    src={item.cover_url}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={item.video_name}
                                description={item.video_intro}
                            />
                            {item.tags.map(tag => (
                                        <Tag
                                            key={tag}
                                            color={"blue"}
                                        >
                                            {tag}
                                        </Tag>
                                    ))}
                        </List.Item>
                    )}
                />
                <div style={{ float: "left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }} />

            </div >
        );
    }
}

export default connectAlita()(VodList);