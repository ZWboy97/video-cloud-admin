import React from 'react';
import { connectAlita } from 'redux-alita';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Tooltip, Avatar, Row, Col, Icon, Divider } from 'antd';
import '../style.less';

//测试的数据
class MessageList extends React.Component {
    constructor(props) {
        super(props)
        this.handlePass = this.handlePass.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.textInput = null;

        this.setTextInputRef = element => {
            console.log(element)
            this.textInput = element;
        };

        this.focusTextInput = () => {
            console.log(this.textInput)
            // Focus the text input using the raw DOM API
            if (this.textInput) this.textInput.focus();
        };
    }
    
      componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }
      scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
      
    handleDelete(item) {
        console.log(item)
        const { message_list_content = {} } = this.props.alitaState || {};
        const { data = {} } = message_list_content || {}
        const { messageInfo = [], count = 0 } = data || {}

        const messageContent = messageInfo.filter(message => message !== item)
        this.props.setAlitaState({
            stateName: 'message_list_content',
            data: {
                count: count,
                messageInfo: messageContent
            }
        })
    }
    handlePass(key) {

    }



    render() {

        const { message_list_content = {} } = this.props.alitaState || {};
        const { data = {} } = message_list_content || {}
        const { messageInfo = [] } = data || {}
        console.log(messageInfo)

        return (
            <div className="infinite-container">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    useWindow={false}
                >
                    <List
                        className="list-box"
                        dataSource={messageInfo}
                        renderItem={item => (
                            <List.Item ref={this.setTextInputRef} key={item.id}>
                                <Row>
                                    <Col span={19}>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar src="http://pic-cloud-bupt.oss-cn-beijing.aliyuncs.com/3QbpEyjbGT.png" />
                                            }
                                            title={<a href="https://ant.design">{item.name}</a>}
                                            description={<div className="item-content">{item.content}</div>}
                                        />
                                    </Col>
                                    <Col span={5}>
                                        <a href="javascript:;" onClick={() => this.handlePass(item)}>
                                            <Tooltip placement="top" title="通过审核">
                                                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                            </Tooltip>
                                        </a>
                                        <Divider type="vertical" />
                                        <a href="javascript:;" onClick={() => this.handleDelete(item)}>
                                            <Tooltip placement="top" title="删除弹幕">
                                                <Icon type="close-circle" theme="twoTone" twoToneColor="red" />
                                            </Tooltip>
                                        </a>
                                    </Col>
                                </Row>

                            </List.Item>
                        )}
                    >
                        {/* {this.state.loading && this.state.hasMore && (
                            <div className="loading-container">
                                <Spin />
                            </div>
                        )} */}
                    </List>
                    <div style={{ float: "left", clear: "both" }} ref={(el) => { this.messagesEnd = el; }} />
                    
                </InfiniteScroll>
            </div >
        );
    }
}

export default connectAlita()(MessageList);