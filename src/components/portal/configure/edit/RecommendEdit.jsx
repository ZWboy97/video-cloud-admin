import React from 'react';
import { Card, Form, Button, Table } from 'antd';
import { connectAlita } from 'redux-alita';
const { Column } = Table;

class RecommendEdit extends React.Component {

    deleteRecommedItem = (e, obj) => {
        e.preventDefault();
        const data = this.state.recommend_list;
        data.splice(obj.order - 1, 1);
        for (var i = 0; i < data.length; i++) {
            data[i].order = i + 1;
        }
        this.setState({
            recommed_list: data
        })
    }

    addRecommedClick = (e) => {
        e.preventDefault();
        console.log('banneradd')
        this.props.setAlitaState({
            stateName: 'portal_add_modal',
            data: {
                visible: true,
                data_desc: 'recommend_list'
            }
        })
    }


    render() {

        const { getFieldDecorator } = this.props.form;
        const { portal_configure_data } = this.props.alitaState || {};
        const recommendListData = portal_configure_data ? portal_configure_data.data.recommend_list : [];

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
            <Card className="banner-edit-container" title="推荐设置">
                <div className="banner-edit-content">
                    <Form
                        {...formItemLayout}
                        className="edit-form"
                        onSubmit={(e) => this.handleSubmit(e)}
                    >
                        <Form.Item label="推荐列表" >
                            {getFieldDecorator('portal_desc')(
                                <a onClick={(e) => this.addRecommedClick(e)}>点击添加推荐条目</ a>,
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
                                dataSource={recommendListData} >
                                <Column title="序号" dataIndex="order" key="order" />
                                <Column title="名称" dataIndex="title" key="title" />
                                <Column title="类型" dataIndex="type" key="type" />
                                <Column title="操作" key="action"
                                    render={(text, record) => {
                                        const obj = record;
                                        return (
                                            <div>
                                                <a onClick={(e) => {
                                                    this.deleteRecommedItem(e, obj)
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

export default Form.create()(connectAlita()(RecommendEdit));