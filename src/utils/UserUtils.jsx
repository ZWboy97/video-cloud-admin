/**
 * 与用户相关的工具函数
 */
import { getLocalStorage } from './index';
import { message } from 'antd';

/**
 * 检查并判断用户用户信息是否完整，不完整，则重新登录
 * @param history 传入 router的history属性
*/
export const checkUserInfo = (history) => {
    var user = getLocalStorage('user');
    if (typeof user === 'undefined') {
        message.error('登录状态异常，请重新登录');
        history.push('/login');
        return false;
    }
    if (!user.hasOwnProperty('cid') || !user.hasOwnProperty('aid')) {
        history.push('/login')
        return false;
    }
    return true;
}