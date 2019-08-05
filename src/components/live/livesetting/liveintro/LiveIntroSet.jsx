import { Row, Col, Button, Upload, Form, Input, message, Icon, Switch } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
import { getLocalStorage } from '../../../../utils/index';
import { checkUserInfo } from '../../../../utils/UserUtils';
//import { VCloudAPI } from '../../../axios/api';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class LiveIntroSet extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave=this.handleSave.bind(this);
    }

    handleChange = info => {

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.props.setAlitaState({
                    stateName: 'intro_picture_set',
                    data: {
                        introPicture: imageUrl,
                    }

                })
            );
        }
    };
    handleSwitch = (switchValue) => {

        console.log(switchValue)
        if (switchValue === false) {
            this.props.setAlitaState({
                stateName: 'intro_picture_set',
                data: {
                    orderButton: false
                }

            });

        }
        else {
            this.props.setAlitaState({
                stateName: 'intro_picture_set',
                data: {
                    orderButton: true
                }

            });
        }

    }
    handleSave(){
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            console.log(fieldsValue["pre_pic"])
            console.log(fieldsValue["qorder"])
            var data={};
            if(fieldsValue["qorder"]){
                data={
                    "pre_pic":'fgjierpgjerkol',
                    "qorder":1
                }
            }
            else{
                data={
                    "pre_pic":'fgjierpgjerkol',
                    "qorder":0
                }
            }
            // //读取表单数据 
            // let data = {
            //     ...fieldsValue,
            // }
          console.log(data)
            if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
                return;
            }
            const user = getLocalStorage('user');
            VCloudAPI.put("/com/" + user.cid + '/liveroom/intro/?aid='+user.aid, {
                ...data
            }).then(response => {
                if (response.status === 200) {
                    const { code = 0, data = {}, msg = {} } = response.data || {};
                    if (code === 200) {
                        message.success('修改成功!');
                        
                    } else {
                        message.error('修改失败!')
                    }
                } else {
                    message.error('网络请求失败！')
                }
            }).catch(r => {
            })
        })
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        const { intro_picture_set = {} } = this.props.alitaState;
        const { data } = intro_picture_set;
        const { introPicture = require('../../../../style/imgs/intro_content.png') } = data || {};

        return (
            <div>

                <Form className="content-padding" labelCol={{ span: 10 }} wrapperCol={{ span: 8 }} onSubmit={this.handleOk}>
                    <Row>
                        <Col span={15}>
                            <Form.Item label="引导页图片">
                                {getFieldDecorator('pre_pic', {

                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {<img src={introPicture} alt="avatar" style={{ width: '100%' }} />}
                                    </Upload>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <div className="text-style">为了保证显示效果，请上传 750 x 1334 大小的图片，支持jpg、jpeg、
png格式，大小不超过 2M</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={15}>
                            <Form.Item label="是否需要预约">
                                {getFieldDecorator('qorder', {

                                })(
                                    <div>
                                        <Switch
                                            defaultChecked
                                            onClick={this.handleSwitch}
                                            checkedChildren={<Icon type="check" />}
                                            unCheckedChildren={<Icon type="close" />}
                                        />
                                    </div>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>


                    <div className="save-button">
                        <Button
                           onClick={this.handleSave}
                           type="primary"
                        >保存</Button>
                    </div>
                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LiveIntroSet))