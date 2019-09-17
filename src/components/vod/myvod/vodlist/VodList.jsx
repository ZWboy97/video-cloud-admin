import React from 'react';
import './style.less';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { connectAlita } from 'redux-alita';

class VodList extends React.Component {


    render() {
        return (
            <div>
                <BreadcrumbCustom first="我的点播" />
                <div>
                    我的点播，包括点播列表以及点播发布弹窗，类似我的点播
                </div>
            </div>
        )
    }

}

export default connectAlita()(VodList);