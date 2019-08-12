import React, {Component} from 'react';
import {Row, Col, Card, Tabs, Icon, Select, Upload} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import ShowVideoList from './VideoListInfo/ShowVideoList';
import PlayList from './PlayListInfo/PlayList'
import VideoSyn from './VideoListInfo/VideoSyn'
const {TabPane} = Tabs;

class VideoListPage extends Component {
    callback(key) {
        console.log(key);
    }

    render() {

        return (
            <div>
                <BreadcrumbCustom first="视频列表"  />
                {/*<Tabs className="video-list" defaultActiveKey="1" onChange={this.callback} tabPosition={'left'}>*/}
                    {/*<TabPane tab="视频列表" key="1">*/}
                        <ShowVideoList/>
                    {/*</TabPane>*/}
                    {/*<TabPane tab="播放列表 " key="2">*/}
                        {/*<PlayList/>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tab="视频同步" key="3">*/}
                        {/*<VideoSyn/>*/}
                    {/*</TabPane>*/}
                {/*</Tabs>*/}
            </div>

        )
    }
}

export default VideoListPage