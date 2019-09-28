import React, { Component } from 'react'
import { Button, Modal, Form, Select, Input, DatePicker, message, Icon, Upload, Row, Col, Tag } from 'antd';
import './style.less'
import { connectAlita } from 'redux-alita';
import { VCloudAPI, TESTJYLAPI } from './../../../../axios/api';
import OssUploader from '../../../../utils/OssUploader';
import { getLocalStorage } from './../../../../utils/index';
import { checkUserInfo } from './../../../../utils/UserUtils';
import { withRouter } from 'react-router-dom';
import { TweenOneGroup } from 'rc-tween-one';


const { TextArea } = Input;
const { Dragger } = Upload;
var rtype,size;

class CreateVodModal extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    state = {
        label: [],
        inputVisible: false,
        inputValue: '',
        pic_url: '',
        res_url: '',
        intro: ''
    };

    componentDidMount() {
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


    beforeUploadCover = file => {
        console.log('beforeuploascover');

        console.log('上传文件名',file.name);
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
                    this.setState({ pic_url: url });

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

    beforeUploadVideo = file => {
        console.log('beforeuploasvideo')
        size=file.size/1024/1024;
        rtype=file.name.substring(file.name.indexOf('.')+1,file.name.length);
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
                    this.setState({ res_url: url });

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

    progress = (percent) => {
        console.log('上传进度:', parseInt(percent * 100));
    }


    handleCancel() {
        this.setModalState(false, false);
    }

    handleOk() {
        const name = this.props.form.getFieldValue("name");
        const { intro } = this.state;
        const { pic_url } = this.state;
        const { res_url } = this.state;
        const { label } = this.state;

        console.log(intro);

        const { vod_list_content = {} } = this.props.alitaState || {};
        const { data = {} } = vod_list_content || {}
        const { videoInfo = [], count = 0 } = data || {}

        console.log(videoInfo)
        if (!checkUserInfo(this.props.history)) {//检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        VCloudAPI.post("/com/" + user.cid + '/resourses/', {
            "aid":user.aid,
            "name":name,
            "rtype":rtype,
            "size":size,
            "label":label,
            "res_url":res_url,
            "pic_url":pic_url,
            "intro":intro
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                const resourse=data.resourse;
                const newData=[...videoInfo,...resourse];
                console.log(data.resourse);
                console.log(newData);
                if (code === 200) {
                    // 向用户直播列表中添加一个记录
                    message.success('成功获取点播列表')
                    this.props.setAlitaState({
                        stateName: 'vod_list_content',
                        data: {
                            videoInfo:newData
                        }
                    });
                    

                } else {
                    message.error('获取列表失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        })
        
        this.setModalState(false, false);
    }

    setModalState(visible, loading) {
        this.props.setAlitaState({
            stateName: 'create_vod_modal',
            data: {
                visible: visible,
                loading: loading
            }
        })
    }

    //tag标签添加删除所需函数

    handleClose = removedTag => {
        const label = this.state.label.filter(tag => tag !== removedTag);
        console.log(label);
        this.setState({ label });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    handleIntroChange = e => {
        console.log(e.target.value);
        this.setState({ intro: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { label } = this.state;
        if (inputValue && label.indexOf(inputValue) === -1) {
            label = [...label, inputValue];
        }
        console.log(label);
        this.setState({
            label,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);

    forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };

    render() {

        const { getFieldDecorator } = this.props.form;

        const { create_vod_modal = {} } = this.props.alitaState;
        const { data } = create_vod_modal;
        const { visible = false, loading = false } = data || {};

        const { label, inputVisible, inputValue } = this.state;
        const tagChild = label.map(this.forMap);
        return (
            <div>
                <Modal
                    visible={visible}
                    title="发布点播"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            创建</Button>,
                    ]}>

                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} onSubmit={this.handleOk}>
                        <Form.Item label="标题">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入点播频道名称' }],
                            })(<Input placeholder='请输入点播频道标题' />)}
                        </Form.Item>
                        <div className="upload-style">
                            <Row>
                                <Col span={5}>
                                    <div className="label-style">文件上传：</div>
                                </Col>
                                <Col span={7}>
                                    <Dragger
                                        beforeUpload={this.beforeUploadCover}
                                    >
                                        <div className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </div>
                                        <div className="ant-upload-text">点击或拖拽至此上传封面</div>
                                    </Dragger>
                                </Col>
                                <Col span={7} offset={1}>
                                    <Dragger
                                        beforeUpload={this.beforeUploadVideo}
                                    >
                                        <div className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </div>
                                        <div className="ant-upload-text">点击或拖拽至此上传视频</div>
                                    </Dragger>
                                </Col>
                            </Row>
                        </div>

                        <div className="upload-style">
                            <Row>
                                <Col span={5}>
                                    <div className="label-style">标签选择：</div>
                                </Col>
                                <Col span={19}>
                                    <div>
                                        <div style={{ marginBottom: 16 }}>
                                            <TweenOneGroup
                                                enter={{
                                                    scale: 0.8,
                                                    opacity: 0,
                                                    type: 'from',
                                                    duration: 100,
                                                    onComplete: e => {
                                                        e.target.style = '';
                                                    },
                                                }}
                                                leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                                appear={false}
                                            >
                                                {tagChild}
                                            </TweenOneGroup>
                                        </div>
                                        {inputVisible && (
                                            <Input
                                                ref={this.saveInputRef}
                                                type="text"
                                                size="small"
                                                style={{ width: 78 }}
                                                value={inputValue}
                                                onChange={this.handleInputChange}
                                                onBlur={this.handleInputConfirm}
                                                onPressEnter={this.handleInputConfirm}
                                            />
                                        )}
                                        {!inputVisible && (
                                            <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                                <Icon type="plus" /> New Tag
          </Tag>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Form.Item label="简介">
                            {getFieldDecorator('intro', {

                            })(<TextArea onChange={this.handleIntroChange} rows={3} placeholder='请输入视频简介' />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(CreateVodModal);


export default withRouter(connectAlita()(WrappedApp));
