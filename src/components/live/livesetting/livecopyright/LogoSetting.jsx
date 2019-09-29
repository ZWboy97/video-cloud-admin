import { Row, Col, Upload, Radio, Form, Button, message, Icon, Slider } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import OssUploader from '../../../../utils/OssUploader';
import { VCloudAPI, YMOCKAPI } from '../../../../axios/api';
class LogoSetting extends React.Component {
    constructor(props){
        super(props)
        this.handleRadio=this.handleRadio.bind(this)
        this.handleSlider=this.handleSlider.bind(this)
    }
    componentDidMount(){
        VCloudAPI.get('sts/token').then(res => {
            console.log(res)
            this.options.config.accessKeySecret = res.data.AccessKeySecret
            this.options.config.accessKeyId = res.data.AccessKeyId
            this.options.config.stsToken = res.data.SecurityToken
            console.log('options', this.options)
        })
    }
    options = {
        config: {
            region: 'oss-cn-beijing',
            accessKeyId: "",
            accessKeySecret: "",
            stsToken: "",
            bucket: 'video-cloud-bupt',
        },
        dirname: '',
        progress: (percent) => {
            console.log('上传进度:', parseInt(percent * 100));
        }
    }
    handleRadio(e){
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const data={...liveConfig,"logo_position":e.target.value}
        this.props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });
    }
    handleSlider(value){
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        const data={...liveConfig,"logo_transparency":value}
        this.props.setAlitaState({
            stateName: 'my_live_config',
            data: data
        });
    }
    beforeUpload = file => {
        console.log('beforeuploascover');
        console.log('上传文件名', file.name);
        console.log(file.size);
        //const video_type=file.name.substring(file.name.indexOf('.'),file.name.length);
        // 创建Uploader
        const upload = new OssUploader({
            ...this.options,//与文件无关的一些配置
            file,// 待上传的文件
        });
        console.log('options', this.options)
        // 开始上传
        upload.start(
            res => {
                console.log('OSS上传返回结果', res)
                if (res.res.status === 200) {
                    message.success('文件上传成功');
                    const url = res.res.requestUrls[0].substring(0, res.res.requestUrls[0].indexOf('?'));
                    console.log('上传文件的返回URL为', url);
                    const { my_live_config = {} } = this.props.alitaState || {};
                    const liveConfig = my_live_config.data || {}
                    const data = { ...liveConfig, "logo_url": url };
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
                        data: data
                    });
                } else {
                    message.error('文件上传失败');
                }
            },
            error => {
                message.error('文件上传失败');
            }
        );
        return false;// 在这里，我们自己通过OSS上传，所以返回false，拦截Upload自己的上传
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { my_live_config = {} } = this.props.alitaState || {};
        const liveConfig = my_live_config.data || {}
        console.log(liveConfig.logo_transparency)

        return (
            <div>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 13 }}>
                    <Form.Item label="logo图片">
                        {getFieldDecorator('logo', {
                        })(
                            <Upload
                                showUploadList={false}                              
                                beforeUpload={this.beforeUpload}
                            >
                                <img src={liveConfig.logo_url} alt="avatar" style={{ width: '30%' }} />
                            </Upload>
                        )}
                    </Form.Item>

                    <Form.Item label="位置">
                        {getFieldDecorator('logo_position', {
                            initialValue: liveConfig.logo_position
                        })(
                            <Radio.Group onChange={this.handleRadio}>
                                <Radio value={1}>左上角</Radio>
                                <Radio value={2}>左下角</Radio>
                                <Radio value={3}>右上角</Radio>
                                <Radio value={4}>右下角</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item label="透明度">
                        {getFieldDecorator('logo_transparency', {
                            initialValue:liveConfig.logo_transparency
                        })(
                            
                            <Slider className="slider-style" onChange={this.handleSlider} />
                        )}
                    </Form.Item>
                   

                </Form>

            </div>
        );
    }

}
export default connectAlita()(Form.create()(LogoSetting))