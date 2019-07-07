/**
 * 菜单路由配置
 */
export default {
    menus: [
        { key: '/app/dashboard/index', title: '概览', icon: 'mobile', component: 'Dashboard' },
        { key: '/app/streams', title: '流管理', icon: 'rocket', component: 'StreamsManager' },
        { key: '/app/client', title: '用户管理', icon: 'copy', component: 'ClientsManager' },
        { key: '/app/dvr', title: '流存储管理', icon: 'edit', component: 'DVRManager' },
        { key: '/app/transform', title: '转码管理', icon: 'area-chart', component: 'TransformManager' },
        { key: '/app/cssModule', title: '服务管理', icon: 'star', component: 'Cssmodule' },
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