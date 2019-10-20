import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { message, Row, Col, Carousel, List, Switch } from 'antd';
import BannerEdit from './BannerEdit';
import './style.less';
import RecommendEdit from './RecommendEdit';
import VideoListEdit from './VideoListEdit';
import SelectModal from './select/SelectModal';
const preview_top = require('../../../../style/imgs/mobile-preview-top.png')

class PortalEditIndex extends React.Component {


    state = {
        banner: [{
            img: "http://10.3.200.202/cache/11/04/video-cloud-bupt.oss-cn-beijing.aliyuncs.com/784c655a133190cc7756cf18c2d35609/bBzmSQakeG.jpg"
        }, {
            img: "http://10.3.200.202/cache/11/04/video-cloud-bupt.oss-cn-beijing.aliyuncs.com/784c655a133190cc7756cf18c2d35609/bBzmSQakeG.jpg"
        }],
        recommend: [{
            img: "https://sta-op.douyucdn.cn/douyu-vrp-admin/2019/09/02/d14acae92df6113cba98bf1c98be3fbe.jpg?x-oss-process=image/format,webp"
        }, {
            img: "https://sta-op.douyucdn.cn/douyu-vrp-admin/2019/09/02/d14acae92df6113cba98bf1c98be3fbe.jpg?x-oss-process=image/format,webp"
        }, {
            img: "https://sta-op.douyucdn.cn/douyu-vrp-admin/2019/09/02/d14acae92df6113cba98bf1c98be3fbe.jpg?x-oss-process=image/format,webp"
        },],
        edit_index: 0
    }


    render() {

        return (
            <div className="portal-edit-index-container">
                <BreadcrumbCustom first="配置门户" />
                <div className="edit-content-container">
                    <Row className="edit-preview-container match-parent">
                        <Col className="preview-container" span={10}>
                            <div className="preview-panel">
                                <div className="mobile-top-title">门户名称</div>
                                <img className="mobile-top-image"
                                    src={preview_top} alt="" />
                                <div className="banner-group"
                                    onClick={() => {
                                        this.setState({ edit_index: 0 });
                                    }}>
                                    <Carousel className=".ant-carousel .slick-slide">
                                        {
                                            this.state.banner.map((item) => {
                                                return (
                                                    <div className="match-parent">
                                                        <img className="banner-image"
                                                            src={item.img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                    <div className="divider-white"></div>
                                </div>
                                <div className="divider"></div>
                                <div className="recommend"
                                    onClick={() => {
                                        this.setState({ edit_index: 1 });
                                    }}>
                                    <div className="card-title">推荐内容</div>
                                    <div className="recommend-list">
                                        {
                                            this.state.recommend ?
                                                <div className="recommend-wrapper">
                                                    {
                                                        this.state.recommend.map(v => (
                                                            <div className="recommend-item">
                                                                <img className="recommed-img" src={v.img} alt="" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                :
                                                ""
                                        }
                                    </div>
                                    <div className="divider-white"></div>
                                </div>
                                <div className="divider"></div>
                                <div className="video-list"
                                    onClick={() => {
                                        this.setState({ edit_index: 2 })
                                    }}>
                                    <div className="card-title">视频列表</div>
                                    <div>
                                        <div style={{ display: '-webkit-box', display: 'flex' }}>
                                            <img style={{ width: '100%', height: '200px' }} src={this.state.banner[0].img} alt="" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Col>
                        <Col className="eidt-container" span={14}>
                            <div className="edit-preview">
                                {
                                    this.state.edit_index === 0 ? (<BannerEdit></BannerEdit>) : ""
                                }
                                {
                                    this.state.edit_index === 1 ? (<RecommendEdit></RecommendEdit>) : ""
                                }
                                {
                                    this.state.edit_index === 2 ? (<VideoListEdit></VideoListEdit>) : ""
                                }
                            </div>
                        </Col>
                    </Row>

                </div>
                <SelectModal></SelectModal>
            </div>)
    }
}

export default PortalEditIndex;
