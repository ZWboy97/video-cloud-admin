import React from 'react';
import { Row, Col, Card, Modal, message } from 'antd';
import BreadcrumbCustom from './BreadcrumbCustom';
import StreamsTable from './tables/StreamsTable';
import { SRSAPI } from '../axios/api'
const confirm = Modal.confirm


class StreamsManager extends React.Component {
    state = {
        streams: []
    };

    updateStreams = () => {
        SRSAPI.get('streams/')
            .then(respone => {
                this.setState({
                    streams: respone.data.streams
                })
            })
    }

    kickoff = (id) => {
        confirm({
            title: '确定强行关闭这个流吗?',
            content: '与该流相关的推流与播放端将停止工作',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                SRSAPI.delete('clients/' + id)
                    .then(response => {
                        message.success('踢流成功！')
                    })
            },
            onCancel() {
            },
        });
    }

    preview = (appname, id) => {

    }

    componentWillMount() {
        this.updateStreams()
        this.interval = setInterval(
            () => {
                this.updateStreams()
            }
            , 2000)
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval)
    }

    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom second="直播流管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="在线直播流" bordered={false}>
                                <StreamsTable streams={this.state.streams}
                                    kickoff={this.kickoff}
                                    preview={this.preview} />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={14}>

                </Row>
            </div>
        )
    }
}

export default StreamsManager;