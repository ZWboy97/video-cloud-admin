/**
 * 菜单路由配置
 * key: 路由path
 * route：路径路由，一般直接key来表示了
 * title：菜单项名称
 * icon：
 * component：组件名称，需要和component模块的index.js导出的组件名称一致
 * auth：是否登录才能查看组件，默认为false（表示需要登录），为true（表示不需要登录）
 * permissions：查看该组件所需要的权限,是一个数组
 * query：
 */
export default {
    menus: [
        { key: '/app/dashboard/index', title: '首页概览', icon: 'dashboard', component: 'Dashboard' },
        {
            key: '/app/lives', title: '直播服务', icon: 'rocket',
            subs: [
                { key: '/app/lives/mylives/', title: '我的直播', component: 'MyLivesIndex' },
            ]
        },
        {
            key: '/app/vod', title: '点播服务', icon: 'copy',
            subs: [
                { key: '/app/vod/upload', title: '上传视频', component: 'VideoUpload' },
                { key: '/app/vod/videolist', title: '视频列表', component: 'VideoListPage' },
                { key: '/app/vod/playlist', title: '播放列表', component: 'PlayList' },

            ]
        },
        {
            key: '/app/account', title: '账户管理', icon: 'area-chart',
            subs: [
                { key: '/app/account/overview', title: '账户总览', component: 'AccountCenter' },
            ]
        },

        {
            key: '/app/user', title: '用户中心', icon: 'star',
            subs: [
                { key: '/app/user/usercenter', title: '个人中心', component: 'UserCenter' },
            ]
        },
    ],
    others: [] // 非菜单相关路由
}