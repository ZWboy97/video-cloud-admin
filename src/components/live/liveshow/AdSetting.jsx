import { Row, Col, Form, Input, Button} from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';

//import { VCloudAPI } from '../../../axios/api';

class AdSetting extends React.Component {



    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 14 }} onSubmit={this.handleOk}>
                    <Form.Item label="跳转URL">
                        {getFieldDecorator('jump', {

                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="图片URL">
                        {getFieldDecorator('picture', {

                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="文本">
                        {getFieldDecorator('text', {

                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col offset={18}>
                                <Button type="primary" >保存</Button>
                            </Col>
                        </Row>
                    </Form.Item>

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(AdSetting))