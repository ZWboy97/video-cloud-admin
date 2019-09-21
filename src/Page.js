import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import RegisterPage from './components/pages/register/RegisterPage';
import App from './App';
import ForgetPsd from './components/pages/ForgetPsd';
import history from './routes/history';
import DirectorPage from './components/pages/livedirector/DirectorPage'

/**
 * Page 页面， 由Router包裹
 */
export default () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/mylive/livelist/" push />} />
            <Route path="/app" component={App} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/forget" component={ForgetPsd} />
            <Route path="/director" component={DirectorPage} />
            <Route component={NotFound} />
        </Switch>
    </Router>
)