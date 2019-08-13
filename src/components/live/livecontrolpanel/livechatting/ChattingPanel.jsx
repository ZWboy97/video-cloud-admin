import React from 'react';
import MessageList from './MessageList';
import '../style.less';
import { connectAlita } from 'redux-alita';
import { Input, Button } from 'antd';
const { TextArea } = Input;

class ChattingPanel extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {
        textValue: ""
    }

    handleChange(e) {

        this.setState({
            textValue: e.target.value
        });
        console.log(this.state.textValue)
    }
    handleSubmit() {
        const { message_list_content = {} } = this.props.alitaState || {};
        const { data={} } = message_list_content || {}
        const { messageInfo = [], count = 0 } = data||{}

        console.log(messageInfo)
        const inputContent = {'id':count, 'name': "lalala", 'content': this.state.textValue }
        const newData = [...messageInfo, inputContent]
        console.log(newData);
        this.props.setAlitaState({
            stateName: 'message_list_content',
            data: {
                count: count + 1,
                messageInfo: newData
            }
        })

        this.setState({
            textValue: ""
        });

    }
    render() {
        return (
            <div className='chatting-box'>
                <MessageList className='message-list' />
                <TextArea className='message-input' value={this.state.textValue} rows={2} onChange={this.handleChange} />
                <Button className='message-submit-button'
                    htmlType="submit" loading={this.submitting} onClick={this.handleSubmit} type="primary">
                    添加弹幕
            </Button>
            </div>
        )
    }
}

export default connectAlita()(ChattingPanel);