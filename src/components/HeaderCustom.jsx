/**
 * 首页，标题栏菜单组件
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connectAlita } from 'redux-alita';
import { Menu, Icon, Layout, Popover } from 'antd';
import SiderCustom from './SiderCustom';
import screenfull from 'screenfull';
import avater from '../style/imgs/default_avtar.png';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {

    state = {
        user: '',
        visible: false, //菜单栏弹窗可见性
        isFullScreen: false,
    };

    componentDidMount() {
        const _user = JSON.parse(localStorage.getItem('user')) || {};//获取已登录的用户信息
        if (_user) {
            this.setState({
                user: _user
            });
        }
    };

    //设置全屏
    screenFull = () => {
        if (screenfull.enabled) {
            if (this.state.isFullScreen) {
                this.setState({ isFullScreen: false })
                screenfull.exit();
            } else {
                this.setState({ isFullScreen: true })
                screenfull.request();
            }
        }
    };

    //标题栏菜单点击逻辑
    menuClick = e => {
        console.log(e);
        switch (e.key) {
            case 'logout':
                this.logout();
                break;
            default: break;
        }
    };

    //注销登录逻辑
    logout = () => {
        //TODO logout的时候，也需要向服务器发送请求
        localStorage.removeItem('user');
        localStorage.removeItem('session_id');
        this.props.history.push('/login');
    };

    //popover可见性变化
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };

    //点击侧菜单之后，将气泡隐藏
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { responsive = { data: {} }, path } = this.props;
        return (
            <Header className="custom-theme header" >
                {
                    responsive.data.isMobile ? (//手机页面侧边菜单通过气泡展示
                        <Popover
                            content={
                                <SiderCustom path={path} popoverHide={this.popoverHide} />
                            }
                            trigger="click"
                            placement="bottomLeft"
                            visible={this.state.visible}
                            onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="header__trigger custom-trigger" />
                        </Popover>
                    ) : (//电脑页面只展示一个按钮，控制sidermenu组件是否展示
                            <Icon
                                className="header__trigger custom-trigger"
                                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.props.toggle}//通过redux
                            />
                        )
                }
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}>
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像" />
                        <i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title={"您好" + this.state.user.name}>
                            <Menu.Item key="profile">个人中心</Menu.Item>
                            <Menu.Item key="logout">退出登录</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(connectAlita(['responsive'])(HeaderCustom));
//在connect外边再包裹一个router