import React, { Component } from 'react';
import { Row, Col, Card, Button, message, Select, Avatar, Tag, Input, Form, Upload } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from '../../axios/api';
import { getLocalStorage } from '../../utils/index';
import { checkUserInfo } from '../../utils/UserUtils';
import OssUploader from '../../utils/OssUploader';

class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleDesc = this.handleDesc.bind(this)
    }


    componentDidMount() {
        VCloudAPI.get('sts/token').then(res => {
            console.log(res)
            this.options.config.accessKeySecret = res.data.AccessKeySecret
            this.options.config.accessKeyId = res.data.AccessKeyId
            this.options.config.stsToken = res.data.SecurityToken
            console.log('options', this.options)
        })
        if (!checkUserInfo(this.props.history)) {//检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        let is_com = 0;
        if (user.aid === user.cid) {
            is_com = 1;
        }
        VCloudAPI.get("/user/" + user.aid + '/info/?is_com=' + is_com, {

        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                console.log(data)
                if (code === 200) {
                    // 向用户直播列表中添加一个记录
                    message.success('成功获取用户信息')
                    this.props.setAlitaState({
                        stateName: 'user_info',
                        data: data
                    });

                } else {
                    message.error('获取配置失败!')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
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

    handleClick() {

        this.props.form.getFieldValue('email')
        if (!checkUserInfo(this.props.history)) {//检查用户信息是否完整
            return;
        }
        const user = getLocalStorage('user');
        let is_com = 0;
        if (user.aid === user.cid) {
            is_com = 1;
        }
        const { user_info = {} } = this.props.alitaState || {};
        const userInfo = user_info.data || {}
        const data = {
            "name": this.props.form.getFieldValue('name'),
            "email": this.props.form.getFieldValue('email'),
            "avtar_url": userInfo.avtar_url,
            "desc": userInfo.desc

        }
        console.log(data)
        VCloudAPI.put("/user/" + user.aid + '/info/?is_com=' + is_com, {
            ...data
        }).then(response => {
            if (response.status === 200) {
                const { code = 0, data = {}, msg = {} } = response.data || {};
                console.log(data)
                if (code === 200) {
                    // 向用户直播列表中添加一个记录
                    message.success('修改成功')
                    this.props.setAlitaState({
                        stateName: 'user_info',
                        data: data
                    });

                } else if (code === 400) {
                    message.error('您输入邮箱已被注册')
                } else {
                    message.error('修改失败')
                }
            } else {
                message.error('网络请求失败！')
            }
        }).catch(r => {
        })
    }
    handleDesc(e) {
        console.log(e.target.value)
        const { user_info = {} } = this.props.alitaState || {};
        const userInfo = user_info.data || {}
        const data = { ...userInfo, "desc": e.target.value }
        this.props.setAlitaState({
            stateName: 'user_info',
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
                    const { user_info = {} } = this.props.alitaState || {};
                    const userInfo = user_info.data || {}
                    const data = { ...userInfo, "avtar_url": url }
                    this.props.setAlitaState({
                        stateName: 'user_info',
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

        const { user_info = {} } = this.props.alitaState || {};
        const userInfo = user_info.data || {}
        console.log(userInfo.desc)
        const { TextArea } = Input;

        const tagsFromServer = userInfo.auth || [];
        //测试

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="用户中心" />
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <Row >
                    <Col md={12} offset={6}>
                        <Card bordered={false}>
                            <Form className="form-style" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} >

                                <Row>
                                    <Col span={4} offset={10}>
                                        <Upload
                                            beforeUpload={this.beforeUpload}
                                            showUploadList={false}
                                        >
                                            <img src={userInfo.avtar_url} alt="avatar" style={{ width: '100%' }} />
                                        </Upload>
                                    </Col>
                                </Row>

                                <Form.Item label="用户名">
                                    {getFieldDecorator('name', {
                                        initialValue: userInfo.name || 'lalala',

                                    })(
                                        <Input />
                                    )}
                                </Form.Item>

                                <Form.Item label="邮箱">
                                    {getFieldDecorator('email', {
                                        initialValue: userInfo.email || {},
                                        rules: [{ required: true, message: '请输入邮箱' }],
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                                <Form.Item label="权限">
                                    <div>{tagsFromServer.map(tag => (
                                        <Tag
                                            key={tag}
                                            color={"blue"}
                                        >
                                            {tag}
                                        </Tag>
                                    ))}</div>
                                </Form.Item>

                                <Form.Item label="备注">
                                    <TextArea value={userInfo.desc} rows={3} onChange={this.handleDesc} />
                                </Form.Item>
                                <Row>
                                    <Col span={2} offset={10}>
                                        <Button type="primary" onClick={this.handleClick}>保存修改</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connectAlita()(Form.create()(UserCenter));