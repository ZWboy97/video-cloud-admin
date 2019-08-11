import React from 'react';
import { Row, Col, Upload, Button, Icon } from 'antd';


class List extends React.Component {
    state = {
        fileList: [
            {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'http://www.baidu.com/xxx.png',
            },
        ],
    };

    handleChange = info => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-5);
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };

    render() {

        const props = {
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: this.handleChange,
            multiple: true,
        };
        return (
            <Row>
                <Col span={5} offset={10}>
                    <div className="start-button">

                        <Button type="primary"> 开始直播
                        </Button>

                    </div>
                    <div className="start-button">
                        <Upload {...props} fileList={this.state.fileList}>
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    </div>


                </Col>
            </Row>

        )
    }

}

export default List;