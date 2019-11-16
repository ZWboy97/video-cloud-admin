import {Button, Row, Col, Modal, Card, Form,Avatar} from 'antd';
import React, {Component} from "react";
import VideoSetting from './VideoSetting'
import {connectAlita} from 'redux-alita';
import Player from 'griffith'

const sources = {
    hd: {
        play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
    },
    sd: {
        play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
    },
}


class VideoCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Col span={6}>
                        <Player sources={sources} />
                        {/*<div>*/}
                            {/*<video src="https://video-bupt.oss-cn-beijing.aliyuncs.com/1-1%20%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.mp4?Expires=1564573428&OSSAccessKeyId=TMP.hWHSFa1QHMrtvXjnchH8YuaMXf9WtTdSCpZfRAV5FUpjQ55ELhvFNFHf8z247CALiSP9MqpagAEkDqJSgDUuoEjLtr6w75QsoqKTr9jJE85zfybaYi9CMtBqkZfpSN.tmp&Signature=MwoCW2CNTCCoUqhGbu795JZ%2FZFI%3D" width="320" height="240" controls="controls">*/}
                                {/*123*/}
                            {/*</video>*/}
                        {/*</div>*/}
                    </Col>
                    <Col span={12}>
                        <p font>
                             jfhkjdshfkjdshfkjdsfk

                        </p>
                    </Col>
                </Card>
            </div>
        )
    }

}

export default connectAlita()(Form.create()(VideoCard));