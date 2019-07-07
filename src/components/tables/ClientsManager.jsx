import React from 'react';
import { Row, Col, Card, message, Modal } from 'antd';
import ClientsTable from './ClientsTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { SRSAPI } from '../../axios/api'
const confirm = Modal.confirm

class ClientsManager extends React.Component {

    state = {
        clients: []
    }

    updateClients = () => {
        SRSAPI.get('clients/')
            .then(response => {
                let data = response.data.clients
                this.setState({
                    clients: data
                })
            })
    }

    kickoff = (id) => {
        confirm({
            title: '确定踢出这个客户端吗?',
            content: '踢出后将中断该客户端的任务',
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


    componentWillMount() {
        this.updateClients()
        this.interval = setInterval(
            () => {
                this.updateClients()
            }, 2000)
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval)
    }


    render() {

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="在线客户端" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="在线用户" bordered={false}>
                                <ClientsTable data={this.state.clients} kickoff={this.kickoff} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default ClientsManager;