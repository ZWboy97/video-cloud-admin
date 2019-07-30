/**
 * 作为模块接口，导出所有的组件
 */
import Dashboard from './dashboard/Dashboard';
import MyLivesIndex from './live/MyLivesIndex';
import LiveDetailPage from './live/livebasicinfo/LiveBasicPage'
import UserCenter from './usercenter/UserCenter';
import VideoDemand from './videodemand/VideoDemand';
import VideoList from './videodemand/VideoList'
export default {
    Dashboard, MyLivesIndex, UserCenter, VideoDemand,LiveDetailPage,VideoList
}