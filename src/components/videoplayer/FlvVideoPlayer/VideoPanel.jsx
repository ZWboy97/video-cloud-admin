import React from 'react';
import FlvPlayer from './FlvPlayer';
import './style.css';

/**
 * 将视频，弹幕，控制面板等组装成最终的视频面板
 */
class VideoPanel extends React.Component {


    render() {
        return (
                <div>
                    
                    <FlvPlayer
                        className='flv-video-player'
                        url={'http://39.106.194.43:8090/live360/1458248448.flv'}
                        type="flv" />
                    
                </div>

        )
    }
}

export default VideoPanel;