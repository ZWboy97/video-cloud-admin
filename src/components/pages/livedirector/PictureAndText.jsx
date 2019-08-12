import React from 'react';
import { connectAlita } from 'redux-alita';
class PictureAndText extends React.Component {
    render() {
        return (
            <div>
                图片和文字
            </div>
        );
    }
}
export default connectAlita()(PictureAndText);