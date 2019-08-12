import React from 'react';
import { connectAlita } from 'redux-alita';
import { Form, Input, Select } from 'antd';

const { Option } = Select;
class LiveRoomTab extends React.Component {
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

                    <Form.Item label="域名">
                        {getFieldDecorator('field_name', {

                        })(
                            <Select placeholder="请选择">
                                <Option value={10}>最多10人</Option>
                                <Option value={20}>最多20人</Option>

                            </Select>,
                        )}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default connectAlita()(Form.create()(LiveRoomTab));
