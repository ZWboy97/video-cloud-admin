import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message, Button } from 'antd';
import { withRouter } from 'react-router-dom';
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
                    <Button className="entry-button"
                        onClick={(e) => this.entryPortalEditPage(e)}
                    >进入门户配置</Button>
                </div>
            </div>)
    }
}

export default withRouter(IndexPage);
