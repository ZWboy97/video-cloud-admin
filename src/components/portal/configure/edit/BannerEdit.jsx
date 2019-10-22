import React from 'react';
import { Card, Form, Input, Button, message, Table } from 'antd';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
const { TextArea } = Input;
const { Column } = Table;

class BannerEdit extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('form data', values);
                const data = this.getPortalConfigureData().banner_list;
                const banner_list = data.map((item) => {
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
                VCloudAPI.put(`/mportal/${user.cid}/banner_list/`, {
                    ...values,
                    id_list: banner_list
                }).then(response => {
                    if (response.data.code === 200) {
                        message.success('保存成功');
                    } else {
                        message.error('网络失败');
                    }
                })
            }
        })
    }

    getPortalConfigureData() {
        const { portal_configure_data } = this.props.alitaState || {}
        const portalData = portal_configure_data ? portal_configure_data.data : {};
        return portalData;
    }

    deleteBannerItem = (e, index) => {
        e.preventDefault();
        const data = this.getPortalConfigureData();
        const banner_list = data ? this.getPortalConfigureData().banner_list : [] || [];
        banner_list.splice(index, 1);
        this.props.setAlitaState({
            stateName: 'portal_configure_data',
            data: {
                ...data,
                banner_list: banner_list
            }
        });
    }

    addBannerClick = (e) => {
        e.preventDefault();
        this.props.setAlitaState({
            stateName: 'portal_add_modal',
            data: {
                visible: true,
                data_desc: 'banner_list'
            }
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { portal_configure_data } = this.props.alitaState || {};
        const portalTitle = portal_configure_data ? portal_configure_data.data.title : "";
        const portalDesc = portal_configure_data ? portal_configure_data.data.desc : "";
        const bannerData = portal_configure_data ? portal_configure_data.data.banner_list : [];
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
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: '请输入您的门户名称!' }],
                                initialValue: portalTitle
                            })(
                                <Input placeholder="输入门户名称" />,
                            )}
                        </Form.Item>
                        <Form.Item label="门户简介">
                            {getFieldDecorator('desc', {
                                initialValue: portalDesc
                            })(
                                <TextArea rows={3} />,
                            )}
                        </Form.Item >
                        <Form.Item label="Banner列表" >
                            <a onClick={(e) => this.addBannerClick(e)}>点击添加Banner</ a>
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
                                dataSource={bannerData} >
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
                                                    this.deleteBannerItem(e, index)
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

export default Form.create()(connectAlita()(BannerEdit));