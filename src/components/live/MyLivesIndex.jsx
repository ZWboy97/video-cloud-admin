import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MyLivesPage from './mylives/MyLivesPage';
import LiveSetting from './livesetting/LiveSetting';
import LiveControlPanel from './livecontrolpanel/LiveControlPanel';

/**
 * Page 页面， 由Router包裹
 */
export default () => (

    <Switch>
        <Route exact path="/app/mylive/" render={() => (<Redirect to="/app/mylive/livelist" />)} />
        <Route exact path="/app/mylive/livelist/" component={MyLivesPage} />
        <Route exact path="/app/mylive/livesetting/:lid" component={LiveSetting} />
        <Route exact path="/app/mylive/controlpanel/:lid" component={LiveControlPanel} />
    </Switch>

)