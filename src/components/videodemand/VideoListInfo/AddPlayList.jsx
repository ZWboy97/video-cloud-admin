import {Form, Input, Row, Col, Upload, Icon, Button, message, Modal} from 'antd';
import React from 'react';
import {connectAlita} from 'redux-alita';
import {TESTJYLAPI} from '../../../axios/api'

const props = {};

class AddPlayList extends React.Component {


    state = {
        modalVisible: false,
    };

    setModalVisible(modalVisible) {
        this.setState({modalVisible});
    }

    handleCancel() {
        this.setModalVisible(false)
    }

    handleOk() {

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            //读取表单数据
            let formData = {
                playlist: fieldsValue['playlist']
            }
            console.log()
            console.log(formData)
            this.props.setAlitaState({
                stateName: 'add_play_list',
                data: {playlist: formData.playlist, isClicked: true},

            })
            const {rowSelectedInfo = {}} = this.props.alitaState
            console.log('rowSel', rowSelectedInfo)
            const {data_source = {}} = this.props.alitaState;
            console.log('data_src', data_source)

            if (typeof (rowSelectedInfo) !== 'undefined' && typeof (rowSelectedInfo.data) !== 'undefined' && typeof (rowSelectedInfo.data.selectedRows) !== 'undefined') {

                for (var i = 0; i < rowSelectedInfo.data.selectedRowKeys.length; i++) {

                if (!rowSelectedInfo.data.selectedRows[i].label.includes(fieldsValue['playlist'])) {
                    let data = {
                        name: rowSelectedInfo.data.selectedRows[i].name,
                        rid: rowSelectedInfo.data.selectedRows[i].rid,
                        label: rowSelectedInfo.data.selectedRows[i].label,
                        pic_url: rowSelectedInfo.data.selectedRows[i].pic_url,
                    }
                    data.label.push(formData.playlist)

                    //rowSelectedInfo.data.selectedRows[i].label.push(formData.playlist)
                    data_source.data[rowSelectedInfo.data.selectedRowKeys[i]].label = data.label
                    console.log('it is dtata', data)
                    TESTJYLAPI.put('com/test/resourses/?test', data)
                }

                }
                this.props.setAlitaState({
                    stateName: 'data_source',
                    data: data_source.data
                })


            }
        })
        this.setModalVisible(false)
    }

    render() {


        // const disable = () =>{
        //     if (typeof(rowSelect) !== 'undefined' && typeof(rowSelect.selectedRows) !== 'undefined') {
        //         if (rowSelect.selectedRows.length() === 1){
        //             return true
        //         }
        //     }
        //     return false
        // }

        // console.log(disable())
        const formItemLayout = {
            labelCol: {
                xs: {span: 12},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 11},
            },
        };
        const {getFieldDecorator} = this.props.form;
        const {video_setting = {}} = this.props.alitaState;
        console.log('video_setting', video_setting)

        return (
            <div>

                <Row type="flex" justify="space-around" align="middle">
                    <Col span="20">
                        <div>
                            <Button type="primary" onClick={() => this.setModalVisible(true)} size='large' icon="edit">
                                播放列表
                            </Button>
                            <Modal
                                title="添加到播放列表"
                                visible={this.state.modalVisible}
                                onOk={() => this.handleOk()}
                                okText="确认"
                                cancelText="取消"
                                onCancel={() => this.handleCancel()}
                            >
                                <Form className="playlist" {...formItemLayout} >
                                    <Form.Item label="播放列表">
                                        {getFieldDecorator('playlist', {
                                            initialValue: "默认列表",
                                            rules: [{message: '请输入播放列表标题'}],
                                        })(<Input/>)}
                                    </Form.Item>
                                </Form>
                            </Modal>

                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default connectAlita()(Form.create()(AddPlayList));
