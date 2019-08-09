import { Row, Col, Radio, Form, Input, Slider, Button } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
//import { VCloudAPI } from '../../../axios/api';



class LampSetting extends React.Component {

   constructor(props){
       super(props)
       this.handleRadio=this.handleRadio.bind(this)
       this.handleLamp=this.handleLamp.bind(this)
       this.handleFont=this.handleFont.bind(this)
       this.handleSlider=this.handleSlider.bind(this)
   }
   handleSlider(value){
    const { my_live_config = {} } = this.props.alitaState || {};
    const liveConfig = my_live_config.data || {}
    const data={...liveConfig,"lamp_transparency":value}
    this.props.setAlitaState({
        stateName: 'my_live_config',
        data: data
    });
   }
   handleFont(e){
    const { my_live_config = {} } = this.props.alitaState || {};
    const liveConfig = my_live_config.data || {}
    const data={...liveConfig,"lamp_font_size":e.target.value}
    this.props.setAlitaState({
        stateName: 'my_live_config',
        data: data
    });
   }
   handleLamp(e){
    const { my_live_config = {} } = this.props.alitaState || {};
    const liveConfig = my_live_config.data || {}
    const data={...liveConfig,"lamp_text":e.target.value}
    this.props.setAlitaState({
        stateName: 'my_live_config',
        data: data
    });
   }
   handleRadio(e){
    const { my_live_config = {} } = this.props.alitaState || {};
    const liveConfig = my_live_config.data || {}
    const data={...liveConfig,"lamp_type":e.target.value}
    this.props.setAlitaState({
        stateName: 'my_live_config',
        data: data
    });
   }
    render() {
        const { getFieldDecorator } = this.props.form;
        let fixContent = [];

        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}

        if (liveConfig.lamp_type === 1) {
            fixContent = (<div >
                <Row>
                    <Col span={9} offset={5}>
                        <Input onChange={this.handleLamp} defaultValue={liveConfig.lamp_text} placeholder="请输入跑马灯内容" />
                    </Col>
                </Row>
                <Row >&nbsp;</Row>
            </div>)
        } else if (liveConfig.lamp_type === 2) {
            fixContent = (<div>
                <Row>
                    <Col span={12} offset={5}>
                        <div className="text-style">
                            按登录用户名进行跑马灯显示，设置白名单/自定义授权后则显示进入用户名，无设置则显示系统默认用户名。
                </div>
                    </Col>
                </Row>
                <Row >&nbsp;</Row>
            </div>
            )
        }else{fixContent=[]}

        return (
            <div>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 9 }}>
                    <Form.Item label="跑马灯类型">
                        {getFieldDecorator('type', {
                            initialValue: liveConfig.lamp_type
                        })(
                            <Radio.Group onChange={this.handleRadio}>
                                <Radio value={1}>固定值</Radio>
                                <Radio value={2}>登陆用户名</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>

                    <div>
                        {fixContent}
                    </div>
                    <Form.Item label="字体">
                        {getFieldDecorator('textType', {
                            initialValue: liveConfig.lamp_font_size
                        })(
                            <Input onChange={this.handleFont} />
                        )}
                    </Form.Item>
                    <Form.Item label="透明度">
                        {getFieldDecorator('transparency', {
                            initialValue: liveConfig.lamp_transparency
                        })(
                            <Slider onChange={this.handleSlider} />
                        )}
                    </Form.Item>
                    


                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LampSetting))