import React from 'react';
import VideoPlayer from '../../videoplayer/FlvVideoPlayer/VideoPanel';
class LiveControlPanel extends React.Component {


    render() {
        return (
            <div>
                控制面板
                <VideoPlayer></VideoPlayer>
            </div>)
    }

}

export default LiveControlPanel;