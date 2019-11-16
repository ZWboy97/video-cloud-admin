/**
 * 注册界面
 * @author NingNing.Wang
 */
import React from 'react';
import { Form, Tabs, Row, Col } from 'antd';
import { connectAlita } from 'redux-alita';
import { withRouter } from 'react-router-dom';
import MobileRegister from './MobileRegister';
import EmailRegister from './EmailRegister';
const { TabPane } = Tabs;
class RegisterPage extends React.Component {

    componentDidMount() {
        document.title = '欢迎注册游目云';
    }

    render() {

        return (
            <div className="register-row">
                <Row type="flex" justify="space-around" align="middle">
                    <Col className="register-colum" span={10}>
                        <div className="register-form">
                            <div className="register-text">欢迎注册</div>
                            <Tabs className="tab-form" defaultActiveKey="1" onChange={this.callback} tabPosition={'top'}>
                                <TabPane className="tab-content" tab="&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;邮箱注册&emsp;&emsp;&emsp;&emsp;&emsp;" key="1">
                                    <EmailRegister />
                                </TabPane>
                                <TabPane tab="&emsp;&emsp;&emsp;&emsp;手机注册&emsp;&emsp;&emsp;&emsp; " key="2">
                                    <MobileRegister />
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default withRouter(connectAlita()(Form.create()(RegisterPage)));