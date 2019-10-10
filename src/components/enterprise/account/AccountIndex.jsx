import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message } from 'antd';
class Accountindex extends React.Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="子账号管理" />
            </div>)
    }
}

export default Accountindex;
