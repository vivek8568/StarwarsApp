import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import PlanetSearch from './components/PlanetSearch';
import PrivateRoute from './components/PrivateRoute';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/planets" component={PlanetSearch} />
    </Switch>
)

export default Routes;