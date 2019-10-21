import React from 'react';
import BreadcrumbCustom from 'mycomponents/BreadcrumbCustom';
import { Row, Col, Carousel } from 'antd';
import BannerEdit from './BannerEdit';
import { connectAlita } from 'redux-alita';
import './style.less';
import RecommendEdit from './RecommendEdit';
import VideoListEdit from './VideoListEdit';
import SelectModal from './select/SelectModal';
const preview_top = require('../../../../style/imgs/mobile-preview-top.png')

class PortalEditIndex extends React.Component {


    state = {
        recommend: [{
            img: "https://sta-op.douyucdn.cn/douyu-vrp-admin/2019/09/02/d14acae92df6113cba98bf1c98be3fbe.jpg?x-oss-process=image/format,webp"
        }, {
            img: "https://sta-op.douyucdn.cn/douyu-vrp-admin/2019/09/02/d14acae92df6113cba98bf1c98be3fbe.jpg?x-oss-process=image/format,webp"
        }, {
            img: "https://sta-op.douyucdn.cn/douyu-vrp-admin/2019/09/02/d14acae92df6113cba98bf1c98be3fbe.jpg?x-oss-process=image/format,webp"
        },],
        edit_index: 0
    }

    componentWillMount() {
        this.props.setAlitaState({
            stateName: 'portal_configure_data',
            data: {
                title: '视频门户',
                desc: "无",
                banner_list: [],
                recommend_list: [],
                video_list: []
            }
        })
        // 从服务器读取数据
    }


    render() {

        const { portal_configure_data } = this.props.alitaState || {};
        const portalTitle = portal_configure_data ? portal_configure_data.data.title : "";
        const portalDesc = portal_configure_data ? portal_configure_data.data.desc : "";
        const bannerData = portal_configure_data ? portal_configure_data.data.banner_list : [];

        return (
            <div className="portal-edit-index-container">
                <BreadcrumbCustom first="配置门户" />
                <div className="edit-content-container">
                    <Row className="edit-preview-container match-parent">
                        <Col className="preview-container" span={10}>
                            <div className="preview-panel">
                                <div className="mobile-top-title">{portalTitle}</div>
                                <img className="mobile-top-image"
                                    src={preview_top} alt="" />
                                <div className="banner-group"
                                    onClick={() => {
                                        this.setState({ edit_index: 0 });
                                    }}>
                                    {
                                        bannerData.length > 0 ? (
                                            <Carousel className=".ant-carousel .slick-slide">
                                                {
                                                    bannerData.map((item) => {
                                                        return (
                                                            <div className="match-parent">
                                                                <img className="banner-image"
                                                                    src={item.pic_url} alt="" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Carousel>
                                        ) : (
                                                <div className="card-title">Banner区域</div>
                                            )
                                    }

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
                                            <img style={{ width: '100%', height: '200px' }} src={this.state.recommend[0].img} alt="" />
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

export default connectAlita()(PortalEditIndex);
