import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AccountDetailIndex from './AccountDetail/AccountDetailIndex';
import AccountListIndex from './AccountList/AccountListIndex';

export default () => (
    <Switch>
        <Route exact path="/app/enterprise/account" render={() => (<Redirect to="/app/enterprise/account/list/" />)} />
        <Route exact path="/app/enterprise/account/list/" component={AccountListIndex} />
        <Route exact path="/app/enterprise/account/detail/" component={AccountDetailIndex} />
    </Switch>
)