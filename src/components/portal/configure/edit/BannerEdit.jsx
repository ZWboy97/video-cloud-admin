import React from 'react';
import { Card, Form, Input, Button, message, Table } from 'antd';
const { TextArea } = Input;
const { Column, ColumnGroup } = Table;

class BannerEdit extends React.Component {

    state = {
        banner_list: [
            {
                order: '1',
                title: '第一个直播',
            },
            {
                order: '2',
                title: '第二个直播',
            },
            {
                order: '3',
                title: '第三个直播',
            },
            {
                order: '4',
                title: '第四个直播',
            },
        ]
    }


    handleSubmit = (e) => {
        message.success('ok')

    }

    deleteBannerItem = (e, obj) => {
        const data = this.state.banner_list;
        data.splice(obj.order - 1, 1);
        for (var i = 0; i < data.length; i++) {
            data[i].order = i + 1;
        }
        this.setState({
            banner_list: data
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 16 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    offset: 11,
                },
                sm: {
                    offset: 11,
                },
            },
        };

        return (
            <Card className="banner-edit-container" title="Banner设置">
                <div className="banner-edit-content">
                    <Form
                        {...formItemLayout}
                        className="edit-form"
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        <Form.Item label="门户名称">
                            {getFieldDecorator('portal_name', {
                                rules: [{ required: true, message: '请输入您的门户名称!' }],
                            })(
                                <Input placeholder="输入门户名称" />,
                            )}
                        </Form.Item>
                        <Form.Item label="门户简介">
                            {getFieldDecorator('portal_desc')(
                                <TextArea rows={3} />,
                            )}
                        </Form.Item >
                        <Form.Item label="Banner列表" >
                            {getFieldDecorator('portal_desc')(
                                <a href={"http://"}>点击添加Banner</ a>,
                            )}
                        </Form.Item>
                        <Form.Item
                            style={{ marginLeft: '10%', marginRight: '8%' }}
                            wrapperCol={{
                                xs: { span: 24 },
                                sm: { span: 24 }
                            }}>
                            <Table
                                size={"middle"}
                                pagination={{ pageSize: 3 }}
                                style={{ maxHeight: "300px" }}
                                dataSource={this.state.banner_list} >
                                <Column title="序号" dataIndex="order" key="order" />
                                <Column title="名称" dataIndex="title" key="title" />
                                <Column title="操作" key="action"
                                    render={(text, record) => {
                                        const obj = record;
                                        return (
                                            <div>
                                                <a onClick={(e) => {
                                                    this.deleteBannerItem(e, obj)
                                                }}>删除</a>
                                            </div>)
                                    }
                                    } />
                            </Table>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                保存
                        </Button>
                        </Form.Item>
                    </Form>

                </div>

            </Card >
        )
    }

}

export default Form.create()(BannerEdit);