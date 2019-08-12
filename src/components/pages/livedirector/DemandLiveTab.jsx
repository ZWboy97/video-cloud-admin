import React from 'react';
import { connectAlita } from 'redux-alita';
import {Form,Input,Button,Icon} from 'antd';
class DemandLiveTab extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(getFieldDecorator)
        return (
            <div>
                <Form labelCol={{ span: 3 }} wrapperCol={{ span: 17 }}>
                    <Form.Item label="备注名">
                        {getFieldDecorator('live_name', {
                            //rules: [{ required: true, message: '请输入视频备注名' }],
                        })(<Input placeholder='请输入视频备注名' />)}
                    </Form.Item>

                    <Form.Item label="视频">
                        <Button type="link"><Icon type="plus" />选择视频</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default connectAlita()(Form.create()(DemandLiveTab));