import { Row, Col, Upload, Radio, Form, Button, message, Icon, Slider } from 'antd';
import React from 'react';
import './style.less';
import { connectAlita } from 'redux-alita';
import OssUploader from '../../../../utils/OssUploader';
//import { VCloudAPI } from '../../../axios/api';

class LogoSetting extends React.Component {
    constructor(props){
        super(props)
        this.handleRadio=this.handleRadio.bind(this)
        this.handleSlider=this.handleSlider.bind(this)
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
        // 配置STS Token， 之后需要从STS服务器去取
        const options = {
            config: {
                region: 'oss-cn-beijing',
                accessKeyId: "STS.NHzCXAWswMA6UhUVMWBkxcNP4",
                accessKeySecret: "9WBs9RAL4ioo48xf17au4k4pxK57FsKkNhEGi672e95i",
                stsToken: "CAISkwJ1q6Ft5B2yfSjIr4vPCOL1uqxW+oPdV07ksk0CTuRUjIv71jz2IH1KeHBsAugctvw/mmFX7PgSlqB6T55OSAmcNZIoS2+qPq3kMeT7oMWQweEuuv/MQBquaXPS2MvVfJ+OLrf0ceusbFbpjzJ6xaCAGxypQ12iN+/m6/Ngdc9FHHP7D1x8CcxROxFppeIDKHLVLozNCBPxhXfKB0ca3WgZgGhku6Ok2Z/euFiMzn+Ck7dL99mgfsT1MJE8Yc8jD+3YhrImKvDztwdL8AVP+atMi6hJxCzKpNn1ASMKvkvaaraPqoc3dF8nN/dgRf5e3/H4lOxlvOvIjJjwyBtLMuxTXj7WWIe62szAFfM14h+KhSJhUhqAAYlpjDY6CbeFKJT0L8T47wsPEm9QPtSUf5/1Mgyqk58HhyymtTPgcK3yX7Mp7qUOa6cu21UUMfLEKqY6ZlLy74NNpiY5x8iI9Py4LIYoRJNpuJJOl6QR/s5DSGiXDupTDkuyH8PgYVu1qmjRxAVQuFH5WWhUHQ4TynjZsbY/U63J",
                bucket: 'pic-cloud-bupt',
            },
            dirname: '',
            progress: this.progress,

        }
        // 创建Uploader
        const upload = new OssUploader({
            ...options,                 // 与文件无关的一些配置
            file,                       // 待上传的文件
        });
        // 开始上传
        upload.start(
            res => {
                console.log('OSS上传返回结果', res)
                if (res.res.status === 200) {
                    message.success('文件上传成功');
                    const url = res.res.requestUrls[0];
                    const { my_live_config = {} } = this.props.alitaState || {};
                    const liveConfig = my_live_config.data || {}
                    const data = { ...liveConfig, "logo_url": url };
                    this.props.setAlitaState({
                        stateName: 'my_live_config',
                        data: data
                    });
                    console.log('上传文件的返回URL为', url);
                } else {
                    message.error('文件上传失败');
                }
            },
            error => {
                message.error('文件上传失败');
            }
        );
        return false;       // 在这里，我们自己通过OSS上传，所以返回false，拦截Upload自己的上传
    }

    progress = (percent) => {
        console.log('上传进度:', parseInt(percent * 100));
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