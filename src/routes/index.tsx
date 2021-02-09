import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

import Musics from '../pages/Musics';
import Artists from '../pages/Artists';
import Listeners from '../pages/Listeners';
import Follows from '../pages/Follows';

import AddMusic from '../pages/AddMusic';
import AddArtist from '../pages/AddArtist';
import AddListener from '../pages/AddListener';
import AddFollow from '../pages/AddFollow';

import EditMusic from '../pages/EditMusic';
import EditArtist from '../pages/EditArtist';
import EditListener from '../pages/EditListener';
import EditFollow from '../pages/EditFollow';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={SignUp} />

        <Route path="/home" component={Musics} isPrivate />
        <Route path="/artists" component={Artists} isPrivate />
        <Route path="/listeners" component={Listeners} isPrivate />
        <Route path="/follows" component={Follows} isPrivate />

        <Route path="/addmusic" component={AddMusic} isPrivate />
        <Route path="/addartist" component={AddArtist} isPrivate />
        <Route path="/addlistener" component={AddListener} isPrivate />
        <Route path="/addfollow" component={AddFollow} isPrivate />

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
        <Route
            path="/editlistener/:id/:phone/:primeiro_nome/:sobrenome/:user"
            component={EditListener}
            isPrivate
        />
        <Route
            path="/editfollow/:id/:artista/:ouvinte"
            component={EditFollow}
            isPrivate
        />
    </Switch>
);

export default Routes;
