import React, { Component } from 'react';
import { Row, Col, Card, Button, Select,Descriptions, Avatar } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
const { Option } = Select;
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];


class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: UserList[0],
            color: colorList[0],
        };
    }

    changeUser = () => {
        const index = UserList.indexOf(this.state.user);
        this.setState({
            user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
            color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
        });
    };

    render() {

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="用户中心" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title='头像' bordered={false}>
                                <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                                    {this.state.user}
                                </Avatar>
                                <Button
                                    size="small"
                                    style={{ marginLeft: 16, verticalAlign: 'middle' }}
                                    onClick={this.changeUser}
                                >
                                    Change
                                </Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card  bordered={false}>
                                <Descriptions title="账户信息" layout="vertical">
                                    <Descriptions.Item label="用户名">AAAA</Descriptions.Item>
                                    <Descriptions.Item label="邮箱">aaa@qq.com</Descriptions.Item>
                                    <Descriptions.Item label="手机号码">110</Descriptions.Item>
                                </Descriptions>
                                <Button className='modify-button' type='primary'> 点击修改 </Button>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserCenter;