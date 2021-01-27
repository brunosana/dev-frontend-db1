import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Musics from '../pages/Musics';
import AddMusic from '../pages/AddMusic';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/home" component={Musics} isPrivate />
        <Route path="/addmusic" component={Musics} isPrivate />
    </Switch>
);

export default Routes;
