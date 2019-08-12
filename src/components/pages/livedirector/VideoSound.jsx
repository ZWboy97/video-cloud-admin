import React from 'react';
import { connectAlita } from 'redux-alita';
class VideoSound extends React.Component {
    render() {
        return (
            <div>
                声音调制
            </div>
        );
    }
}
export default connectAlita()(VideoSound);