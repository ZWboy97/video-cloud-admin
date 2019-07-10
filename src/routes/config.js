/**
 * 菜单路由配置
 * key: 路由path
 * route：路径路由，一般直接key来表示了
 * title：菜单项名称
 * icon：
 * component：组件名称，需要和component模块的index.js导出的组件名称一致
 * login：是否登录才能查看组件，默认为false（表示需要登录），为true（表示不需要登录）
 * auth：查看该组件所需要的权限
 * query：
 */
export default {
    menus: [
        { key: '/app/dashboard/index', title: '首页概览', icon: 'dashboard', component: 'Dashboard' },
        {
            key: '/app/live', title: '直播服务', icon: 'rocket',
            subs: [
                { key: '/app/lives/mylives', title: '我的直播', component: 'Buttons' },
                { key: '/app/ui/recharts', title: '直播统计', component: 'Recharts' },
                { key: '/app/ui/spins', title: '通用设置', component: 'Spins' },
                { key: '/app/ui/modals', title: '应用中心', component: 'Modals' }
            ]
        },
        {
            key: '/app/vod', title: '点播服务', icon: 'copy',
            subs: [
                { key: '/app/ui/banners', title: '我的点播', component: 'Banners' },
                { key: '/app/ui/echarts', title: '点播统计', component: 'Echarts' },
                { key: '/app/ui/drags', title: '资源管理', component: 'Drags' },
                { key: '/app/ui/gallery', title: '通用设置', component: 'Gallery' },
                { key: '/app/ui/map', title: '广告管理', component: 'MapUi' },
            ]
        },
        {
            key: '/app/dvr', title: '用户画像', icon: 'edit',
            subs: [
                { key: '/app/ui/exampleAnimations', title: '直播用户', component: 'ExampleAnimations' },
                { key: '/app/ui/advancedTable', title: '点播用户', component: 'AdvancedTable' },
            ]
        },
        {
            key: '/app/transform', title: '账户管理', icon: 'area-chart',
            subs: [
                { key: '/app/ui/exampleAnimations', title: '账户总览', component: 'ExampleAnimations' },
                { key: '/app/ui/advancedTable', title: '充值提现', component: 'AdvancedTable' },
                { key: '/app/ui/asynchronousTable', title: '账单流水', component: 'AsynchronousTable' },
                { key: '/app/ui/basicForm', title: '认证服务', component: 'BasicForm' },
            ]
        },

        {
            key: '/app/cssModule', title: '用户中心', icon: 'star',
            subs: [
                { key: '/app/ui/notifications', title: '个人中心', component: 'Notifications' },
                { key: '/app/ui/tabs', title: '操作日志', component: 'Tabs' },
                { key: '/app/ui/basic', title: '权限管理', component: 'AuthBasic' },
            ]
        },
        {
            key: '/app/ui', title: 'UI', icon: 'scan',
            subs: [
                { key: '/app/ui/buttons', title: '按钮', component: 'Buttons' },
                { key: '/app/ui/icons', title: '图标', component: 'Icons' },
                { key: '/app/ui/spins', title: '加载中', component: 'Spins' },
                { key: '/app/ui/modals', title: '对话框', component: 'Modals' },
                { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications' },
                { key: '/app/ui/tabs', title: '标签页', component: 'Tabs' },
                { key: '/app/ui/banners', title: '轮播图', component: 'Banners' },
                { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle' },
                { key: '/app/ui/drags', title: '拖拽', component: 'Drags' },
                { key: '/app/ui/gallery', title: '画廊', component: 'Gallery' },
                { key: '/app/ui/map', title: '地图', component: 'MapUi' },
                { key: '/app/ui/basicAnimations', title: '基础动画', component: 'BasicAnimations' },
                { key: '/app/ui/exampleAnimations', title: '动画案例', component: 'ExampleAnimations' },
                { key: '/app/ui/basicTable', title: '基础表格', component: 'BasicTable' },
                { key: '/app/ui/advancedTable', title: '高级表格', component: 'AdvancedTable' },
                { key: '/app/ui/asynchronousTable', title: '异步表格', component: 'AsynchronousTable' },
                { key: '/app/ui/basicForm', title: '基础表单', component: 'BasicForm' },
                { key: '/app/ui/echarts', title: 'echarts', component: 'Echarts' },
                { key: '/app/ui/recharts', title: 'recharts', component: 'Recharts' },
                { key: '/login', title: '登录' },
                { key: '/404', title: '404' },
                { key: '/app/ui/basic', title: '基础演示', component: 'AuthBasic' },
                { key: '/app/ui/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
                { key: '/app/ui/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
            ],
        },

    ],
    others: [] // 非菜单相关路由
}