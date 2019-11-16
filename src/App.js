import React, { Component } from 'react';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout } from 'antd'; //jlaksdjf 
import { connectAlita } from 'redux-alita';

const { Content, Footer } = Layout;


/**
 * APP界面，单页应用
 */
class App extends Component {

    constructor(props) {
        super(props);
        console.log('设置头部')
    }

    /**
     * state，实现本地的简单控制，未经过redux框架
     */
    state = {
        collapsed: false, //边栏是否收缩
        title: ''
    };

    componentWillMount() {
        // 计算宽度，并存储到state中
        this.getClientWidth();
        // 设置监听，当window宽度变化的时候，再次判断
        window.onresize = () => {
            this.getClientWidth();
        }
    }

    /**
     * 组件Mount成功
     */
    componentDidMount() {

    }

    /**
     * 获取当前浏览器宽度并设置responsive管理响应式
    */
    getClientWidth = () => {
        const { setAlitaState } = this.props;
        const clientWidth = window.innerWidth;
        setAlitaState({
            stateName: 'responsive',
            data: {
                isMobile: clientWidth <= 992
            }
        }); // state变更之后，将重新render
    };

    /**
     * 切换按钮点击响应
     */
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    /**
     * 组件的渲染
     */
    render() {
        const { title } = this.state;
        // 从redux框架提供的props中解析出需要的数据
        const { auth = { data: {} }, responsive = { data: {} } } = this.props;
        console.log(auth);
        return (
            <DocumentTitle title={title}>
                <Layout>
                    {
                        !responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />
                    }
                    <Layout style={{ flexDirection: 'column' }}>
                        <HeaderCustom
                            toggle={this.toggle}
                            collapsed={this.state.collapsed}
                            user={auth.data || {}}
                        />
                        <Content
                            style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}
                        >
                            <Routes auth={auth} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            视频云管理平台
                        </Footer>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default connectAlita(['auth', 'responsive'])(App); // connect函数
