import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message, Button, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import QRCode from 'qrcode.react';
import copyToBoard from 'copy-to-clipboard';
import './style.less';

class IndexPage extends React.Component {



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
                            <div className="statist-number">30</div>
                            <div className="total-number">总访问用户:2</div>
                        </Card>
                        <Card title="今日访问量(PV)"
                            headStyle={{ textAlign: "center" }}
                            style={{ width: 300 }}
                        >
                            <div className="statist-number">200</div>
                            <div className="total-number">总访问量:10</div>
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
                                value={JSON.stringify("http://site.jackchance.cn")} />
                            <div className="link-operations">
                                <a href="http://" onClick={(e) => {
                                    e.preventDefault();
                                    copyToBoard('http://site.jackchance.cn');
                                    message.success("复制成功");
                                }}>复制链接</a>
                                <a href="http://site.jackchance.cn" target="_blank">电脑端打开</a>

                            </div>
                        </div>

                    </div>

                </div>
            </div>)
    }
}

export default withRouter(IndexPage);
