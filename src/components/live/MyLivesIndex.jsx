import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MyLivesPage from './mylives/MyLivesPage';
import LiveSetting from './LiveSetting';

/**
 * Page 页面， 由Router包裹
 */
console.log('MyLiveIndex')
export default () => (
   
        <Switch>
            <Route exact path="/app/lives/mylives/" component={MyLivesPage} />
            <Route path="/app/lives/mylives/setting/" component={LiveSetting} />
        </Switch>
   
)