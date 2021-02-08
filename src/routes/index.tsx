import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import Musics from '../pages/Musics';
import Artists from '../pages/Artists';

import AddMusic from '../pages/AddMusic';
import AddArtist from '../pages/AddArtist';
import AddListener from '../pages/AddListener';

import EditMusic from '../pages/EditMusic';
import EditArtist from '../pages/EditArtist';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/home" component={Musics} isPrivate />
        <Route path="/artists" component={Artists} isPrivate />

        <Route path="/addmusic" component={AddMusic} isPrivate />
        <Route path="/addartist" component={AddArtist} isPrivate />
        <Route path="/addlistener" component={AddListener} isPrivate />
        <Route
            path="/editmusic/:id/:nome/:duracao"
            component={EditMusic}
            isPrivate
        />
        <Route
            path="/editartist/:id/:stage_name/:biography/:formation_year/:user"
            component={EditArtist}
            isPrivate
        />
    </Switch>
);

export default Routes;
