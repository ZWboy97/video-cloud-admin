import { Button } from 'antd';
import React, { Component } from 'react';
import { connectAlita } from 'redux-alita';

class VideoDownload extends Component {
    constructor(props) {
        super(props)
        console.log('props', props)
    }

    handleClick = () => {
        const { rowSelectedInfo = {} } = this.props.alitaState
        console.log('rowSel', rowSelectedInfo)
        if (typeof (rowSelectedInfo) !== 'undefined' && typeof (rowSelectedInfo.data) !== 'undefined' && typeof (rowSelectedInfo.data.selectedRows) !== 'undefined') {

            for (let i = 0; i < rowSelectedInfo.data.selectedRowKeys.length; i++) {
                fetch(rowSelectedInfo.data.selectedRows[i].res_url).then(res => res.blob().then(blob => {
                    console.log('res', res)
                    console.log('blob', blob)
                    let a = document.createElement('a');
                    console.log('a', a)
                    let url = res.url
                    console.log('url', url)
                    let filename = url.split('/')[6]
                    console.log('filename', filename)
                    if (filename) {
                        a.href = url;
                        a.download = rowSelectedInfo.data.selectedRows[i].res_url.name + filename.substring(filename.lastIndexOf('.') + 1, filename.length); //给下载下来的文件起个名字
                        a.click();
                        window.URL.revokeObjectURL(url);
                        a = null;
                    }
                }))
            }
        }

    }
    render() {
        return (
            <div>
                <Button type="primary" size="large" icon="delete" onClick={this.handleClick}>
                    下载视频
                </Button>
            </div>
        )
    }
}

export default connectAlita()(VideoDownload);