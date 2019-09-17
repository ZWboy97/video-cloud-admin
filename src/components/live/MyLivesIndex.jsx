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
        <Route exact path="/app/live/" render={() => (<Redirect to="/app/live/mylives" />)} />
        <Route exact path="/app/live/mylives/" component={MyLivesPage} />
        <Route exact path="/app/live/livesetting/:lid" component={LiveSetting} />
        <Route exact path="/app/live/controlpanel/:lid" component={LiveControlPanel} />
    </Switch>

)