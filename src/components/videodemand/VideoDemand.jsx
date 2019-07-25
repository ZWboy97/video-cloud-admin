import React, {Component} from 'react';
import {Row, Col, Card, Button, notification, Icon, Select, Upload, message, Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';

const {Option} = Select;
const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const fileList = [];
const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    previewFile(file) {
        console.log('Your upload file:', file);
        return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
            method: 'POST',
            body: file,
        })
            .then(res => res.json())
            .then(({thumbnail}) => thumbnail);
    },
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },

};
const props2 = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    listType: 'picture',
    defaultFileList: [...fileList],
};
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class VideoDemand extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        fileList2: []
    };
    viewAttachment = file => {
        let reader = new FileReader();

        //if reading completed
        reader.onload = e => {
            //set values of selected attachment
            let newSelectedAttachment = {};
            newSelectedAttachment.file = file;
            newSelectedAttachment.blobData = e.target.result;

            //if file type is image then show the attachment or download the same
            if (file.type.includes("video")) {
                this.setState({
                    selectedAttachment: newSelectedAttachment
                });
            }
        };

        //read the file
        reader.readAsDataURL(file);
    };
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });
    handleChange2 = ({ fileList }) => this.setState({ fileList2: fileList });
    render() {
        const {previewVisible, previewImage, fileList, fileList2} = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {imageUrl} = this.state;
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom first="我的点播"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title='设置封面' bordered={false}>
                                <Upload
                                    {...props2}
                                >
                                    <Button>
                                        <Icon type="upload" /> 点击上传封面
                                    </Button>
                                </Upload>

                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title='我的视频' bordered={false}>
                                <React.Fragment>
                                    <Upload
                                        multiple={false}
                                        beforeUpload={e => false}
                                        showUploadList={false}
                                        onChange={info => {
                                            if (info.file.status !== "uploading") {
                                                let newFileList = this.state.fileList;
                                                newFileList.push(info.file);
                                                this.setState({
                                                    fileList: newFileList
                                                });
                                            }
                                        }}
                                        defaultFileList={[...fileList]}

                                    >
                                        <Button>
                                            <Icon type="upload"/> 点击上传视频
                                        </Button>
                                    </Upload>
                                    {this.state.fileList.length > 0 && (
                                        <ul>
                                            {this.state.fileList.map((file, index) => {
                                                return (
                                                    <li
                                                        onClick={() => this.viewAttachment(file)}
                                                        style={{cursor: "pointer"}}
                                                        key={index}
                                                    >
                                                        {file.name}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                    {this.state.selectedAttachment && (
                                        <video width="400" controls>
                                            <source
                                                src={this.state.selectedAttachment.blobData}
                                                type={this.state.selectedAttachment.file.type}
                                            />
                                        </video>
                                    )}
                                </React.Fragment>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title='我的频道' bordered={false}>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/> 点击上传视频至频道
                                    </Button>
                                </Upload>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title='我的相簿' bordered={false}>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={fileList2}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange2}

                                >
                                    {fileList2.length >= 3 ? null : uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                </Modal>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default VideoDemand;