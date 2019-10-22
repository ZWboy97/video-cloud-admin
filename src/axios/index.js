/**
 * Created by hao.cheng on 2017/4/16.
 */
import { get } from './tools';
import * as config from './config';

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });