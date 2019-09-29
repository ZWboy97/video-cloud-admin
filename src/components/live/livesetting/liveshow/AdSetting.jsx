import { Form, Input} from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';

//import { VCloudAPI } from '../../../axios/api';

class AdSetting extends React.Component {



    render() {

        const { getFieldDecorator } = this.props.form;
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        return (
            <div>
                <Form labelCol={{ span: 9}} wrapperCol={{ span: 14 }} onSubmit={this.handleOk}>
                    <Form.Item label="跳转URL">
                        {getFieldDecorator('ad_jump_url', {
                            initialValue:liveConfig.ad_jump_url
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="图片URL">
                        {getFieldDecorator('ad_pic_url', {
                            initialValue:liveConfig.ad_pic_url
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="文本">
                        {getFieldDecorator('ad_text', {
                              initialValue:liveConfig.ad_text
                        })(
                            <Input />
                        )}
                    </Form.Item>

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create({
    onValuesChange(props, changedValues, allValues) {
        console.log(allValues);
        const { my_live_config = {} } = props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const data={...liveConfig,...changedValues}
        props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });
    }
})(AdSetting))