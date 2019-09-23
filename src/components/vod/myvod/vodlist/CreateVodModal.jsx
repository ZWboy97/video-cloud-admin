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


const {TextArea} =Input;
const { Dragger } = Upload


class CreateVodModal extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    state = {
        tags: ['Tag 1', 'Tag 2', 'Tag 3'],
        inputVisible: false,
        inputValue: '',
        cover_url:'',
        video_url:'',
        video_intro:''
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
        console.log('beforeuploas')

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
                    this.setState({ cover_url: url });

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
        console.log('beforeuploas')

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
                    this.setState({ video_url: url });

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
       const video_name=this.props.form.getFieldValue("name");
       const { video_intro }=this.state;
       const { cover_url } = this.state;
       const { video_url } = this.state;
       const { tags } = this.state;

       console.log(video_intro);

       const { vod_list_content = {} } = this.props.alitaState || {};
       const { data={} } = vod_list_content || {}
       const { videoInfo = [], count = 0 } = data||{}

       console.log(videoInfo)
       const inputContent = {
           'id':count, 
           'video_name': video_name, 
           'cover_url':  cover_url,
           'video_url':video_url, 
           'tags': tags, 
           'video_intro': video_intro
        }
       const newData = [...videoInfo, inputContent]
       console.log(newData);
       this.props.setAlitaState({
           stateName: 'vod_list_content',
           data: {
               count: count + 1,
               videoInfo: newData
           }
       })
       this.setModalState(false, false);
            // const user = getLocalStorage('user');
            // VCloudAPI.post("/com/" + user.aid + '/liverooms/', {
            //     aid: user.aid,
            //     ...data
            // }).then(response => {
            //     if (response.status === 200) {
            //         const { code = 0, data = {}, msg = {} } = response.data || {};
            //         console.log(data);
            //         if (code === 200) {
            //             message.success('创建成功!');
            //             this.props.form.resetFields();
            //             this.setModalState(false, false);
            //             var { my_live_list } = this.props.alitaState;
            //             const { liveList } = my_live_list || {};
            //             const { live_room } = data;
            //             liveList.unshift(live_room);
            //             // 向用户直播列表中添加一个记录
            //             this.props.setAlitaState({
            //                 stateName: 'my_live_list',
            //                 data: liveList
            //             });
            //         } else {
            //             message.error('创建失败!')
            //         }
            //     } else {
            //         message.error('网络请求失败！')
            //     }
            // }).catch(r => {
            // })
        
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
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    handleIntroChange = e => {
console.log(e.target.value);
        this.setState({ video_intro: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
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

        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
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
