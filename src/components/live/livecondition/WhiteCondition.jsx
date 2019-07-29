import { Table, Form, Button, Row, Col, Input, Popconfirm } from 'antd'
import React from 'react';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../axios/api'
import { Link, withRouter } from 'react-router-dom';

class WhiteCondition extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

        this.columns = [
            {
                title: '用户ID',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
            }, {
                title: '用户姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'center',
                render: (text, record) =>
                    <div>
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    </div>
            },
        ]
    }
    handleDelete = key => {
        const { white_user_table = {} } = this.props.alitaState;
        const { data } = white_user_table;
        const { dataSource = [], count = 0 } = data || {};
        this.props.setAlitaState({
            stateName: 'white_user_table',
            data: {
                dataSource: dataSource.filter(item => item.key !== key),
                count: count,
            }
        })
    };
    handleAdd = e => {
        e.preventDefault();
        console.log("click create button");
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("if")
                const { white_user_table = {} } = this.props.alitaState;
                const { data } = white_user_table;
                const { dataSource = [], count = 0 } = data || {};
                const newData = {
                    key: count,
                    id: values.id,
                    name: '小红',
                };
                this.props.setAlitaState({
                    stateName: 'white_user_table',
                    data: {
                        dataSource: [...dataSource, newData],
                        count: count + 1,
                    }
                })
            }
        });
    };
    render() {

        const { getFieldDecorator } = this.props.form;
        const { white_user_table = {} } = this.props.alitaState;
        const { data } = white_user_table;
        const { dataSource = [] } = data || {};

        return (
            <div>
                <Form layout="inline" onSubmit={this.handleAdd}>
                    <Row>
                        <Col span={5} offset={2}>
                            <Form.Item >
                                {getFieldDecorator('id', {
                                    rules: [{ required: true, message: '请输入用户ID!' }],
                                })(<Input placeholder={"请输入用户ID"} />)}
                            </Form.Item>
                        </Col>
                        <Col span={4} offset={1}>
                            <Form.Item >
                                <Button type="primary" htmlType="submit" >添加</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Row className="table-content">
                    <Col span={12}>
                        <Table
                            indentSize={5}
                            dataSource={dataSource}
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