import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import App from './App';
import ForgetPsd from './components/pages/ForgetPsd';

/**
 * Page 页面， 由Router包裹
 */
console.log('page')
export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/forget" component={ForgetPsd} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)