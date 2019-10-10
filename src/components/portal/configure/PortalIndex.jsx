import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import IndexPage from './index/PortalIndexPage';
import PortalEditIndex from './edit/PortalEditIndex';

export default () => (
    <Switch>
        <Route exact path="/app/portal/configure" render={() => (<Redirect to="/app/portal/configure/index/" />)} />
        <Route exact path="/app/portal/configure/index/" component={IndexPage} />
        <Route exact path="/app/portal/configure/edit/" component={PortalEditIndex} />
    </Switch>
)