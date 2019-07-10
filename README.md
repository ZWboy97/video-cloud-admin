- 视频云平台的Web管理平台 
- [项目地址](http://www.jackchance.cn/video-cloud/react-admin.git)
- [部署预览地址](http://www.baidu.com)(目前还未部署)

### 一、安装脚本
##### 1. 安装依赖
```js
npm install
```

##### 2. 运行
```js
npm start
```

##### 3.打包项目
```js
npm run build
```

### 二、目录结构和依赖
#### 1. 项目目录结构
```js
+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/
|   --- index.html							---首页入口html文件
|   --- npm.json							---echarts测试数据
|   --- weibo.json							---echarts测试数据
+-- src/                                    ---核心代码目录
|   +-- axios                               ---http请求存放目录
|   |    --- index.js
|   +-- components                          ---各式各样的组件存放目录
|   |    +-- animation                      ---动画组件
|   |    |    --- ...
|   |    +-- charts                         ---图表组件
|   |    |    --- ...
|   |    +-- dashboard                      ---首页组件
|   |    |    --- ...
|   |    +-- forms                          ---表单组件
|   |    |    --- ...
|   |    +-- pages                          ---页面组件
|   |    |    --- ...
|   |    +-- tables                         ---表格组件
|   |    |    --- ...
|   |    +-- ui                             ---ui组件
|   |    |    --- ...
|   |    --- BreadcrumbCustom.jsx           ---面包屑组件
|   |    --- HeaderCustom.jsx               ---顶部导航组件
|   |    --- Page.jsx                       ---页面容器
|   |    --- SiderCustom.jsx                ---左边菜单组件
|   +-- style                               ---项目的样式存放目录，主要采用less编写
|   +-- utils                               ---工具文件存放目录
|   --- App.js                              ---组件入口文件
|   --- index.js                            ---项目的整体js入口文件，包括路由配置等
--- .env                                    ---启动项目自定义端口配置文件
--- .eslintrc                               ---自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json
```

#### 2. 项目依赖
<span style="color: rgb(184,49,47);">由create-react-app创建的，主要还是列出新加的功能依赖包</span>

<span style="color: rgb(184,49,47);">点击名称可跳转相关网站</span>

- [react](https://facebook.github.io/react/)
- [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react路由，4.x的版本</span>)
- [redux](https://redux.js.org/)(基础用法，但是封装了通用action和reducer，demo中主要用于权限控制
- [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的react ui组件框架</span>)
- [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http请求模块，可用于前端任何场景，很强大</span>)
- [echarts-for-react](https://github.com/hustcc/echarts-for-react)(<span style="color: rgb(243,121,52);">可视化图表，别人基于react对echarts的封装，足够用了</span>)
- [recharts](http://recharts.org/#/zh-CN/)(<span style="color: rgb(243,121,52);">另一个基于react封装的图表，个人觉得是没有echarts好用</span>)
- [nprogress](https://github.com/rstacruz/nprogress)(<span style="color: rgb(243,121,52);">顶部加载条，蛮好用</span>)
- [react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)(<span style="color: rgb(243,121,52);">别人基于react的富文本封装，如果找到其他更好的可以替换</span>)
- [react-draggable](https://github.com/mzabriskie/react-draggable)(<span style="color: rgb(243,121,52);">拖拽模块，找了个简单版的</span>)
- [screenfull](https://github.com/sindresorhus/screenfull.js/)(<span style="color: rgb(243,121,52);">全屏插件</span>)
- [photoswipe](https://github.com/dimsemenov/photoswipe)(<span style="color: rgb(243,121,52);">图片弹层查看插件，不依赖jQuery，还是蛮好用</span>)
- [animate.css](http://daneden.me/animate)(<span style="color: rgb(243,121,52);">css动画库</span>)
- [react-loadable](https://github.com/jamiebuilds/react-loadable)(代码拆分，按需加载，预加载，样样都行，具体见其文档，推荐使用)
- [redux-alita](https://github.com/yezihaohao/redux-alita) 极简的redux2react工具
- 其他小细节省略

### 三、功能模块划分
#### 1. 首页概览
通过图表、列表的方式展示平台整体的使用情况，以及一些常用功能的快速入口，主要需要包括如下几个关键信息。
- 异常信息通知：比如余额不足、服务中断、服务升级等通知。
- 账户信息：账户余额信息、账户消耗信息，充值入口等。
- 直播信息：当前直播流数、在线人数、直播时长、正在进行的直播快速入口
- 点播信息：点播信息统计
- 快速操作入口：创建直播，直播列表，进入正在进行的直播控制台，点播列表，账户充值，

#### 2. 直播服务
与直播服务相关的功能
##### 我的直播：
- 展示当前已经创建的所有直播，需要提供直播的一些关键信息。
- 点击相应的直播Item，可以进入详细的直播控制台页面，在直播控制台中对当前的直播进行相关的配置和管理。
- 在页面的显著位置提供创建直播按钮，点击后弹窗或者进入创建直播界面，创建成功后，返回直播列表界面。
- 该界面支持直播列表的增删改查。

##### 直播统计
- 按照不同的时间维度（小时，天，周，月）提供直播统计信息。
- 按照不同的直播频道进行统计和对比
- 访问次数，观看时长，观看人数，直播数目，直播最大人数，观看ip数目，访问数目，人均观看时长
- 尽量以图表的方式进行展示。

##### 通用设置
独立于单独直播控制台中的设置，为所有的直播提供默认通用的设置。
- 直播观看权限：是否需要用户登录和验证
- 版权保护：水印、防录屏跑马灯
- 敏感词：对于聊天室，提供敏感词过滤功能
- 广告：为直播添加广告，视频广告或者直播界面广告。
- 