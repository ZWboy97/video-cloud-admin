import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MyVodPage from './vodlist/MyVodPage';

/**
 * Page 页面， 由Router包裹
 */
export default () => (

    <Switch>
        <Route exact path="/app/myvod/" render={() => (<Redirect to="/app/myvod/vodlist" />)} />
        <Route exact path="/app/myvod/vodlist/" component={MyVodPage} />
    </Switch>

)