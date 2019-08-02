import { Row, Col, Upload, Radio, Form, Button, message, Icon, Slider } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
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
class LogoSetting extends React.Component {


    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div >Upload</div>
            </div>
        );
        const { imageUrl } = this.state;


        return (
            <div>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 13 }}>
                    <Form.Item label="logo图片">
                        {getFieldDecorator('logo', {
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
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        )}
                    </Form.Item>

                    <Form.Item label="位置">
                        {getFieldDecorator('position', {
                            initialValue: '1'
                        })(
                            <Radio.Group >
                                <Radio value={1}>左上角</Radio>
                                <Radio value={2}>左下角</Radio>
                                <Radio value={3}>右上角</Radio>
                                <Radio value={4}>右下角</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="透明度">
                        {getFieldDecorator('transparency', {
                            initialValue:30
                        })(
                            
                            <Slider className="slider-style" />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Row>
                            <Col span={2} offset={16}>
                                <Button type="primary">保存</Button>
                            </Col>
                        </Row>
                    </Form.Item>

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LogoSetting))