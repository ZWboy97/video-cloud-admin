import React from 'react';
import { connectAlita } from 'redux-alita';
import './style.less';
import { Row, Col, Icon } from 'antd';

class VideoSource extends React.Component {
    constructor(props){
        super(props)
        this.handleGetVideo=this.handleGetVideo.bind(this)
    }

    handleGetVideo(){
        this.props.setAlitaState({
            stateName:'add_video_modal',
            data:{
                visible:true
            }
        })
    }

    render() {
        const videoId=this.props.id
        return (
            <div >
                <div className="single-video">
                    <div className="single-source">
                        <div className="upload-warn" >
                            <a href="javascript:;" onClick={this.handleGetVideo}><Icon type="plus" />添加视频</a></div>
                    </div>
                    <div className="video-setting">
                        <Row>
                            <Col span={2} offset={2}>
                                <div>{videoId}</div>
                            </Col>
                            <Col span={2} offset={16}>
                                <div><Icon type="setting" /></div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
export default connectAlita()(VideoSource);