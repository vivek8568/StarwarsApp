import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../components/container/Login';
import PlanetSearch from '../components/container/PlanetSearch';
import PrivateRoute from '../components/container/PrivateRoute';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/planets" component={PlanetSearch} />
    </Switch>
)

export default Routes;