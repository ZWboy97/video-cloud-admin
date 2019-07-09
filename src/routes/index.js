import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'; // https://www.jianshu.com/p/e3adc9b5f75c
import DocumentTitle from 'react-document-title';
import AllComponents from '../components';          //导入所有的组件
import routesConfig from './config';                //导入菜单栏路由配置
import queryString from 'query-string';

export default class CRouter extends Component {

    /**
     * 组件高阶函数
     * 对于需要权限的组件进行权限检查，无权限的情况下重定向到404页面
     * 各个组件需要的权限在路由的config文件中进行配置
     */
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        //从网络数据获得auth数据
        //const { auth } = store.getState().httpData;
        const { permissions } = auth.data;
        if (!permissions || !permissions.includes(permission))
            return <Redirect to={'404'} />;
        return component;
    };

    /**
     * 判断用户查看该组件是否需要登录
     * @param component 需要登录检查的组件
     * @param permission 查看该组件所需要的权限
     */
    requireLogin = (component, permission) => {
        //Todo, 基于本地信息判断用户是否已经登录，之后需要切换到更安全的验证方式
        const _user = JSON.parse(localStorage.getItem('user'));
        if (!_user) {
            return <Redirect to={'/login'} />;
        } else {
            return permission ? this.requireAuth(permission, component) : component;
        }

        const { auth } = this.props;
        //从网络数据获得auth数据
        //const { auth } = store.getState().httpData;
        const { permissions } = auth.data;
        //process.env.NODE_ENV === 'production' &&
        if (!permissions) { //判断是否登录
            return <Redirect to={'/login'} />;
        }
        return permission ? this.requireAuth(permission, component) : component;
    };

    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key =>
                        routesConfig[key].map(r => {
                            const route = r => {
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        render={props => {
                                            const reg = /\?\S*/g;
                                            // 匹配?及其以后字符串
                                            const queryParams = window.location.hash.match(reg);
                                            // 去除?的参数
                                            const { params } = props.match;
                                            Object.keys(params).forEach(key => {
                                                params[key] = params[key] && params[key].replace(reg, '');
                                            });
                                            props.match.params = { ...params };
                                            const merge = { ...props, query: queryParams ? queryString.parse(queryParams[0]) : {} };
                                            // 重新包装组件
                                            const wrappedComponent = (
                                                <DocumentTitle title={r.title}>
                                                    <Component {...merge} />
                                                </DocumentTitle>
                                            )
                                            return r.login
                                                ? wrappedComponent
                                                : this.requireLogin(wrappedComponent, r.auth)
                                        }}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}