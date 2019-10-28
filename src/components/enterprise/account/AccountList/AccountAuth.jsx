import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form, Select, Checkbox, DatePicker, message, Tag } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './style.less'
import { connectAlita } from 'redux-alita';
import { VCloudAPI } from 'myaxios/api';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
import { withRouter } from 'react-router-dom';
import { TweenOneGroup } from 'rc-tween-one';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['权限1', '权限2', '权限3', '权限4', '权限5', '权限6'];
const defaultCheckedList = [];

class AccountAuth extends Component {

    constructor(props) {
        super(props)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    state = {
        plainOptions: plainOptions,
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        tags: ['权限7', '权限8', '权限9'],
    };
    handleClose = removedTag => {
        console.log(removedTag);
        const tags = this.state.tags.filter(tag => tag !== removedTag);

        this.setState({
            tags: tags,
        });
        this.updateOptions(removedTag)
    };
    updateOptions=remove=>{
        const options = this.state.plainOptions;
        options.push(remove);
        console.log(options);
        this.setState({
            checkedList:[],
            plainOptions: options
        });
        console.log(this.state.plainOptions);
    }
    onChange = checkedList => {
        this.setState({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    handleCancel() {
        this.setModalState(false);
    }

    handleOk() {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            //读取表单数据
            const rangeTime = fieldsValue['range_time'];
            let data = {
                ...fieldsValue,
                'start_time': rangeTime[0].format('YYYY-MM-DD HH:mm:ss'),
                'end_time': rangeTime[1].format('YYYY-MM-DD HH:mm:ss')
            }
            delete data.range_time; //数据中去掉无用的字段
            console.log('data from form: ', data);
            this.setModalState(true);
            if (!checkUserInfo(this.props.history)) {   //检查用户信息是否完整
                return;
            }
            const user = getLocalStorage('user');
            VCloudAPI.post("/com/" + user.aid + '/liverooms/', {
                aid: user.aid,
                ...data
            }).then(response => {
                if (response.status === 200) {
                    const { code = 0, data = {}, msg = {} } = response.data || {};
                    console.log(data);
                    if (code === 200) {
                        message.success('创建成功!');
                        this.props.form.resetFields();
                        this.setModalState(false, false);
                        var { my_account_list } = this.props.alitaState;
                        const { accountList } = my_account_list || {};
                        const { account_room } = data;
                        accountList.unshift(account_room);
                        // 向用户直播列表中添加一个记录
                        this.props.setAlitaState({
                            stateName: 'my_account_list',
                            data: accountList
                        });
                    } else {
                        message.error('创建失败!')
                    }
                } else {
                    message.error('网络请求失败！')
                }
            }).catch(r => {
            })
        })
    }

    setModalState(visible) {
        this.props.setAlitaState({
            stateName: 'auth_update',
            data: {
                visible: visible
            }
        })
    };
    addAuth = () => {
        const tags = this.state.tags;
        const checkedList = this.state.checkedList
        tags.push(...checkedList);
        let plainOptions = this.state.plainOptions;
        plainOptions = plainOptions.filter(function (item) {
            return checkedList.indexOf(item) < 0;
        })

        console.log(plainOptions);
        this.setState({
            tags: tags,
            plainOptions: plainOptions
        })
    
    };


    render() {
        const { auth_update = {} } = this.props.alitaState;
        const { data } = auth_update;
        const { visible = false } = data || {};
        const { tags, plainOptions } = this.state;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="添加子账号"
                    width={700}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="cancel" onClick={this.handleCancel}>
                            取消</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            创建</Button>,
                    ]}>
                    <Row>
                        <Col span={10} offset={1}>
                            <div>
                                <div>
                                    可分配权限
                                </div>
                                <br />
                                <div>
                                    <CheckboxGroup
                                        className="checkbox-style"
                                        options={plainOptions}
                                        value={this.state.checkedList}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />
                                <div><Button type="primary" onClick={this.addAuth}>确认添加</Button></div>
                            </div>
                        </Col>
                        <Col span={10} offset={1}>
                            <div>该子账户已有权限</div>
                            <br />
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
                                    {tags.map(tag =>
                                        (
                                            <Tag
                                                className="tag-style"
                                                closable
                                                onClose={e => {
                                                    e.preventDefault();
                                                    this.handleClose(tag);
                                                }}
                                            >
                                                {tag}
                                            </Tag>
                                        ))}
                                </TweenOneGroup>
                            </div>
                        </Col>
                    </Row>


                </Modal>
            </div>
        )
    }
}

const WrappedApp = Form.create({ name: 'coordinated' })(AccountAuth);

export default withRouter(connectAlita()(WrappedApp));
