import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import IndexPage from './index/PortalIndexPage';
import PortalEditIndex from './edit/PortalEditIndex';

export default () => (
    <Switch>
        <Route exact path="/app/portal/" render={() => (<Redirect to="/app/portal/configure/" />)} />
        <Route exact path="/app/portal/configure/" component={IndexPage} />
        <Route exact path="/app/portal/edit/" component={PortalEditIndex} />
    </Switch>
)