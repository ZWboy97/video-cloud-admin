import { Table, Form, Button, Row, Col, Input, Popconfirm,message } from 'antd'
import React from 'react';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';

class WhiteCondition extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd=this.handleAdd.bind(this)

        this.columns = [
            {
                title: '用户邮箱',
                dataIndex: 'email',
                key: 'email',
                align: 'center',
            }, {
                title: '用户姓名',
                dataIndex: 'uname',
                key: 'uname',
                align: 'center',
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'center',
                render: (text, record) =>
                    <div>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.email)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    </div>
            },
        ]
    }
    handleDelete = email => {
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid;
        const config={
            "lid":lid,
            "condition":liveConfig.condition,
            "condition_type":liveConfig.condition_type,
            "email": this.props.form.getFieldValue("email"),
        }
        console.log(config);
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/condition/?aid=' + user.aid, {
            ...config
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                if (code === 200) {
                    message.success('成功删除!');
                    const configData = {
                        ...liveConfig, 
                        "white_user_list":data,
                    };
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
                        data: configData
                    });


                } else {
                    message.error('删除失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        });
        
    };
    handleAdd (){
        console.log(this.props.form.getFieldValue("email"))
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const lid =liveConfig.live_room_info.lid;
        const config={
            "lid":lid,
            "condition":liveConfig.condition,
            "condition_type":liveConfig.condition_type,
            "email": this.props.form.getFieldValue("email"),
        }
        console.log(config);
        if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.put("/com/" + user.cid + '/liveroom/condition/?aid=' + user.aid, {
            ...config
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                const {white_user_list} =data
                console.log(data);
                if (code === 200) {
                    message.success('添加成功!');
                    const configData = {
                        ...liveConfig, 
                        "white_user_list":white_user_list,
                    };
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
                        data: configData
                    });


                }else if(code===406) {
                    message.error('您所添加的用户未注册!')
                }else if(code===500) {
                    message.error('您所添加的用户已添加!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        });
        
    };
    render() {

        const { getFieldDecorator } = this.props.form;

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        return (
            <div>
                <Form layout="inline">
                    <Row>
                        <Col span={7} offset={2}>
                            <Form.Item >
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请输入用户邮箱!' }],
                                })(<Input placeholder={"请输入用户邮箱"} />)}
                            </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                            <Form.Item >
                                <Button type="primary" onClick={this.handleAdd}>添加</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Row className="table-content">
                    <Col span={15}>
                        <Table
                            indentSize={5}
                            dataSource={liveConfig.white_user_list}
                            columns={this.columns}
                            bordered={true}
                            size='small'
                        />
                    </Col>
                </Row>
            </div >
        );
    }
}

// 直播表格表头


const data = [
    {
        key: '1',
        id: '000001',
        name: '第一个直播',

    }, {
        key: '2',
        id: '000002',
        name: '直播名称',

    },
]

export default connectAlita()(Form.create()(WhiteCondition));