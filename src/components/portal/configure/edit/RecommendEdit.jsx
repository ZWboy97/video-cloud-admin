import React from 'react';
import { Card, Form, Button, Table, message } from 'antd';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
const { Column } = Table;

class RecommendEdit extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.getPortalConfigureData().recommend_list;
        const recommend_list = data.map((item) => {
            return {
                id: item.type === "live" ? item.lid : item.rid,
                type: item.type
            }
        });
        // 提交数据
        if (!checkUserInfo(this.props.history)) {
            return;
        }
        var user = getLocalStorage('user');
        VCloudAPI.put(`/mportal/${user.cid}/recommend_list/`, {
            id_list: recommend_list
        }).then(response => {
            if (response.data.code === 200) {
                message.success('保存成功');
            } else {
                message.error('网络失败');
            }
        })
    }

    getPortalConfigureData() {
        const { portal_configure_data } = this.props.alitaState || {}
        const portalData = portal_configure_data ? portal_configure_data.data : {};
        return portalData;
    }

    deleteRecommedItem = (e, index) => {
        e.preventDefault();
        const { portal_configure_data } = this.props.alitaState || {};
        const data = portal_configure_data ? portal_configure_data.data.recommend_list : [];
        data.splice(index, 1);
        this.props.setAlitaState({
            stateName: 'portal_configure_data',
            data: {
                ...portal_configure_data.data,
                recommend_list: data
            }
        });
        message.success('删除成功');
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
                                <Column
                                    title="序号"
                                    align="center"
                                    render={(text, record, index) => `${index + 1}`} />
                                <Column title="名称" dataIndex="name" key="name" />
                                <Column title="类型" dataIndex="type" key="type" />
                                <Column title="操作" key="action"
                                    render={(text, record, index) => {
                                        return (
                                            <div>
                                                <a onClick={(e) => {
                                                    this.deleteRecommedItem(e, index)
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