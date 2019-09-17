/**
 * 作为模块接口，导出所有的组件
 */
import Dashboard from './dashboard/Dashboard';
import MyLivesIndex from './live/MyLivesIndex';
import LiveDetailPage from './live/livesetting/livebasicinfo/LiveBasicPage'
import UserCenter from './usercenter/UserCenter';
import VideoUpload from './videodemand/VideoUpload';
import PlayList from './videodemand/PlayListInfo/PlayList'
import VideoListPage from './videodemand/VideoListPage';
import AccountCenter from './account/overview/index';
import MyVodIndex from './vod/myvod/MyVodIndex';
export default {
    Dashboard, MyLivesIndex, UserCenter, VideoUpload, LiveDetailPage, VideoListPage, AccountCenter, PlayList,
    MyVodIndex
}