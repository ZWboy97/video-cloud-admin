import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsProjects from './EchartsProjects';
import { SRSAPI } from '../../axios/api'

class Dashboard extends React.Component {

    state = {
        running: true,
        srs_duration: 0,
        srs_cpu: 0,
        srs_mem_kbyte: 0,
        srs_mem_percent: 0,
        sys_mem_ram_kbyte: 0,
        sys_mem_ram_percent: 0,
        sys_cpus: 0,
        sys_cpus_online: 0,
        sys_uptime: 0,
        sys_cpu_percent: 0,
        sys_disk_write_KBps: 0,
        sys_disk_read_KBps: 0,
    }


    updateSummaries = () => {
        SRSAPI.get('summaries')
            .then(response => {
                let data = response.data.data
                this.setState({
                    running: data.ok,
                    srs_duration: data.self.srs_uptime,
                    srs_cpu: data.self.cpu_percent,
                    srs_mem_kbyte: data.self.mem_kbyte,
                    srs_mem_percent: data.self.mem_percent,
                    sys_mem_ram_kbyte: data.system.mem_ram_kbyte,
                    sys_mem_ram_percent: data.system.mem_ram_percent,
                    sys_cpus: data.system.cpus,
                    sys_cpus_online: data.system.cpus_online,
                    sys_uptime: data.system.uptime,
                    sys_cpu_percent: data.system.cpu_percent,
                    sys_disk_write_KBps: data.system.disk_write_KBps,
                    sys_disk_read_KBps: data.system.disk_read_KBps,
                })
            })
    }

    updateClients = () => {
        SRSAPI.get('clients/')
            .then(response => {
                let length = response.data.clients.length
                this.setState({
                    srs_client_number: length
                })
            })
    }

    updateStreams = () => {
        SRSAPI.get('streams/')
            .then(response => {
                let length = response.data.streams.length
                this.setState({
                    srs_streams_number: length
                })
            })
    }

    secondToString = (time) => {
        var days = Math.floor((time / (3600 * 24)))
        var hours = Math.floor((time - (days * 3600 * 24)) / 3600)
        var minutes = Math.floor((time - (days * 3600 * 24) - (hours * 3600)) / 60)
        var time_string = ""
        if (days > 0) {
            time_string += (days + "天 ")
        }
        time_string += (hours + "小时 ")
        time_string += (minutes + "分钟")
        return time_string
    }




    componentDidMount() {
        this.updateSummaries()
        this.updateClients()
        this.updateStreams()
        this.interval = setInterval(
            () => {
                this.updateSummaries()
            }
            , 3000)
        this.interval2 = setInterval(
            () => {
                this.updateClients()
                this.updateStreams()
            }
            , 6000)
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval)
        this.interval2 && clearInterval(this.interval2)
    }


    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row >
                    <Col className="gutter-row" >
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="poweroff" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">直播服务状态</div>
                                        <h2>Running</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">服务运行</div>
                                        <h2>{this.secondToString(this.state.srs_duration)}</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">CPU占用</div>
                                        <h2>{(this.state.srs_cpu * 100).toFixed(2) + " %"}</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">内存占用</div>
                                        <h2>{(this.state.srs_mem_kbyte / 1024).toFixed(1) + "MB / "
                                            + Math.round(this.state.sys_mem_ram_kbyte / 1024 / 1024) + "GB "
                                            + (this.state.srs_mem_percent * 100).toFixed(2) + "%"}</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">网络占用</div>
                                        <h2>3 / 435Kbps / 0Kbps</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="area-chart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">在线流数目</div>
                                        <h2>{this.state.srs_streams_number}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">系统运行</div>
                                        <h2>{this.secondToString(this.state.sys_uptime)}</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">CPU状况 (在线/总核数)</div>
                                        <h2>{(this.state.sys_cpu_percent * 100).toFixed(2) + " % " + this.state.sys_cpus_online
                                            + "/" + this.state.sys_cpus}</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">内存状况</div>
                                        <h2>{(this.state.sys_mem_ram_kbyte * this.state.sys_mem_ram_percent / 1024).toFixed(0) + "MB / "
                                            + Math.round(this.state.sys_mem_ram_kbyte / 1024 / 1024) + "GB "
                                            + (this.state.sys_mem_ram_percent * 100).toFixed(2) + "%"}</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">网络状况</div>
                                        <h2>3 / 435Kbps / 0Kbps</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="team" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">在线人数</div>
                                        <h2>{this.state.srs_client_number}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">外网</div>
                                        <h2>0Kbps / 0Kbps</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">内网</div>
                                        <h2>452Kbps / 455Kbps</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">连接</div>
                                        <h2>1047967</h2>
                                    </div>
                                </div>
                                <div className="clear y-center">
                                    <div className="clear">
                                        <div className="text-muted">磁盘(读/写)</div>
                                        <h2>{this.state.sys_disk_read_KBps + "KBps / " + this.state.sys_disk_write_KBps + "KBps"}</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>


                </Row>
            </div>
        )
    }
}

export default Dashboard;