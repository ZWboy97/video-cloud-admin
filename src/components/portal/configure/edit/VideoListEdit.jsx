import React from 'react';
import { Card, Form, Input, Button, Table } from 'antd';
import { connectAlita } from 'redux-alita';
const { Column } = Table;

class VideoListEdit extends React.Component {

    deleteVideoListItem = (e, obj) => {
        e.preventDefault();
        const data = this.state.video_list;
        data.splice(obj.order - 1, 1);
        for (var i = 0; i < data.length; i++) {
            data[i].order = i + 1;
        }
        this.setState({
            video_list: data
        })
    }

    addVideoListItem = (e) => {
        e.preventDefault();
        console.log('banneradd')
        this.props.setAlitaState({
            stateName: 'portal_add_modal',
            data: {
                visible: true,
                data_desc: 'video_list'
            }
        })
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { portal_configure_data } = this.props.alitaState || {};
        const videoListData = portal_configure_data ? portal_configure_data.data.video_list : [];
        const formItemLayout = {
            labelCol: {
                xs: { span: 5 },
                sm: { span: 5 },
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
            <Card className="banner-edit-container" title="视频列表设置">
                <div className="banner-edit-content">
                    <Form
                        {...formItemLayout}
                        className="edit-form"
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        <Form.Item label="视频列表" >
                            {getFieldDecorator('portal_desc')(
                                <a onClick={(e) => this.addVideoListItem(e)}>点击添加视频列表条目</ a>,
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
                                pagination={{ pageSize: 5 }}
                                style={{ maxHeight: "300px" }}
                                dataSource={videoListData} >
                                <Column title="序号" dataIndex="order" key="order" />
                                <Column title="名称" dataIndex="title" key="title" />
                                <Column title="类型" dataIndex="type" key="type" />
                                <Column title="操作" key="action"
                                    render={(text, record) => {
                                        const obj = record;
                                        return (
                                            <div>
                                                <a onClick={(e) => {
                                                    this.deleteVideoListItem(e, obj)
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

export default Form.create()(connectAlita()(VideoListEdit));