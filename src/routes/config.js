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
                { key: '/app/videodemand/VideoUpload', title: '上传视频', component: 'VideoUpload' },
                { key: '/app/videodemand/VideoListPage', title: '视频列表', component: 'VideoListPage' },
                { key: '/app/videodemand/PlayListInfo/PlayList', title: '播放列表', component: 'PlayList' },

            ]
        },
        {
            key: '/app/dvr', title: '用户画像', icon: 'edit',
            subs: [
                { key: '/app/ui/exampleAnimations', title: '直播用户', component: 'Dashboard' },
                { key: '/app/ui/advancedTable', title: '点播用户', component: 'Dashboard' },
            ]
        },
        {
            key: '/app/transform', title: '账户管理', icon: 'area-chart',
            subs: [
                { key: '/app/ui/exampleAnimations', title: '账户总览', component: 'Dashboard' },
            ]
        },

        {
            key: '/app/cssModule', title: '用户中心', icon: 'star',
            subs: [
                { key: '/app/usercenter/UserCenter', title: '个人中心', component: 'UserCenter' },
            ]
        },
    ],
    others: [] // 非菜单相关路由
}