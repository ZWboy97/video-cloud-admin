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

                } else if(code===400){
                    message.error('您输入邮箱已被注册')
                }else{
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
                    const { user_info = {} } = this.props.alitaState || {};
                    const userInfo = user_info.data || {}
                    const data = { ...userInfo, "avtar_url": url }
                    this.props.setAlitaState({
                        stateName: 'user_info',
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

        const { user_info = {} } = this.props.alitaState || {};
        const userInfo = user_info.data || {}
        console.log(userInfo.desc)
        const { TextArea } = Input;

        const tagsFromServer = userInfo.auth || ['Movies', 'Books', 'Music', 'Sports'];

        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="用户中心" />
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <Row >
                    <Col md={12} offset={6}>
                        <Card bordered={false}>
                            <Form className="form-style" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} >
                                <Form.Item label="头像">
                                    {getFieldDecorator('avtar_url', {
                                    })(
                                        <Row>
                                            <Col span={8}>
                                                <Upload
                                                    beforeUpload={this.beforeUpload}
                                                    showUploadList={false}
                                                >
                                                    <img src={userInfo.avtar_url} alt="avatar" style={{ width: '100%' }} />
                                                </Upload>
                                            </Col>
                                        </Row>
                                    )}
                                </Form.Item>
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