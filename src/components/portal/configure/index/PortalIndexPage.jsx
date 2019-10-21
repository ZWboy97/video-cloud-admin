import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message, Button, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import QRCode from 'qrcode.react';
import copyToBoard from 'copy-to-clipboard';
import { getLocalStorage } from 'myutils/index';
import { checkUserInfo } from 'myutils/UserUtils';
import { VCloudAPI } from 'myaxios/api.js';
import './style.less';

class IndexPage extends React.Component {

    state = {
        day_visit: 0,
        day_volume: 0,
        portal_url: "",
        total_visit: 0,
        total_volume: 0
    }

    componentWillMount() {
        if (!checkUserInfo(this.props.history)) {
            return;
        }
        var user = getLocalStorage('user');
        VCloudAPI.get(`/wportal/${user.cid}/info/`).then(response => {
            if (response.data.code === 200 && response.data.data) {
                this.setState(response.data.data)
            } else {
                message.error('请求数据错误');
            }
        });
    }

    entryPortalEditPage = (e) => {
        this.props.history.push('/app/portal/configure/edit/');
    }

    render() {
        return (
            <div className="portal-index-container">
                <BreadcrumbCustom first="视频门户" />
                <div className="content-container">
                    <div className="page-title">视频门户可以用来聚合您的优质视频资源</div>

                    <div className="statist-container">
                        <Card title="今日访问用户(UV)"
                            headStyle={{ textAlign: "center" }}
                            style={{ width: 300 }}
                        >
                            <div className="statist-number">{this.state.day_visit}</div>
                            <div className="total-number">总访问用户:{this.state.total_visit}</div>
                        </Card>
                        <Card title="今日访问量(PV)"
                            headStyle={{ textAlign: "center" }}
                            style={{ width: 300 }}
                        >
                            <div className="statist-number">{this.state.day_volume}</div>
                            <div className="total-number">总访问量:{this.state.total_volume}</div>
                        </Card>
                    </div>

                    <div className="bottom-container">
                        <div className="configure-entry-container">
                            <Button className="entry-button"
                                onClick={(e) => this.entryPortalEditPage(e)}
                            >进入门户管理</Button>
                            <div className="entry-text">开始为您的门户添加内容吧</div>
                        </div>
                        <div className="link-container">
                            <QRCode className="qr-code" size={70}
                                value={this.state.portal_url} />
                            <div className="link-operations">
                                <a href="http://" onClick={(e) => {
                                    e.preventDefault();
                                    copyToBoard(this.state.portal_url);
                                    message.success("复制成功");
                                }}>复制链接</a>
                                <a href={this.state.portal_url} target="_blank">电脑端打开</a>

                            </div>
                        </div>

                    </div>

                </div>
            </div>)
    }
}

export default withRouter(IndexPage);
