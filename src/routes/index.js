import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'; // https://www.jianshu.com/p/e3adc9b5f75c
import DocumentTitle from 'react-document-title';
import AllComponents from '../components'; //导入所有的组件
import routesConfig from './config'; //导入菜单栏路由配置
import queryString from 'query-string';
import { connectAlita } from 'redux-alita';

class CRouter extends Component {

    /**
     * 组件高阶函数
     * 对于需要权限的组件进行权限检查，无权限的情况下重定向到404页面
     * 各个组件需要的权限在路由的config文件中进行配置
     */
    requireAuth = (permission, component) => {
        const { user_permissions } = this.props.alitaState || {};
        const { data = [] } = user_permissions || {};
        if (!data || !data.includes(permission))
            return <Redirect to={'404'} />;
        return component;
    };

    /**
     * 判断用户查看该组件是否需要登录
     * @param component 需要登录检查的组件
     * @param permission 查看该组件所需要的权限
     */
    requireLogin = (component, auth, permissions) => {
        if (!auth) {
            //基于本地信息判断用户是否已经登录
            const _user = localStorage.getItem('session_id');
            if (!_user) {
                localStorage.removeItem('user');
                localStorage.removeItem('session_id');
                return <Redirect to={'/login?redirect=' + encodeURIComponent(window.location.pathname)} />;
            } else {
                // 登录之后，查看用户是否具有访问该组件的权限
                return permissions ? this.requireAuth(permissions, component) : component;
            }
        } else { //不需要登录的组件
            return component;
        }

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
                                        path={r.route || r.key}
                                        render={props => {
                                            // 将URL后的参数解析为props传到组件中
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
                                                : this.requireLogin(wrappedComponent, r.auth, r.permissions)
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

export default connectAlita()(CRouter);