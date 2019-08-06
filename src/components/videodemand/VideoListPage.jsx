import React, {Component} from 'react';
import {Row, Col, Card, Tabs, Icon, Select, Upload} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ShowVideoList from './VideoListInfo/ShowVideoList'

const {TabPane} = Tabs;

class VideoListPage extends Component {
    callback(key) {
        console.log(key);
    }

    render() {

        return (
            <div>
                <BreadcrumbCustom first="视频列表"  />
                <Tabs className="video-list" defaultActiveKey="1" onChange={this.callback} tabPosition={'left'}>
                    <TabPane tab="视频列表" key="1">
                        <ShowVideoList/>
                    </TabPane>
                    <TabPane tab="播放列表 " key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="视频回收站" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="视频同步" key="4">
                        Content of Tab Pane 4
                    </TabPane>
                    <TabPane tab="剪辑管理" key="5">
                        Content of Tab Pane 5
                    </TabPane>
                </Tabs>
            </div>

        )
    }
}

export default VideoListPage