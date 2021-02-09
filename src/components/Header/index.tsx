import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    AiOutlineSearch,
    AiOutlinePoweroff,
    AiOutlineBars,
    AiOutlineCloseCircle,
} from 'react-icons/ai';
import { Container, Content, Search, Logout, LogoutMobile } from './styles';

import { useAuth } from '../../hooks/authContext';

const Header: React.FC = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const handleShowSideBar = useCallback(() => {
        setShowSideBar(!showSideBar);
    }, [showSideBar]);

    const { signOut } = useAuth();
    const history = useHistory();

    const handleSignOut = useCallback(() => {
        signOut();
        history.push('/');
    }, [signOut, history]);

    return (
        <Container showSideBar={showSideBar}>
            <div id="sideBar">
                <Link id="home" to="/home">
                    Home
                </Link>
                <Link to="/home">Musics</Link>
                <Link to="/artists">Artists</Link>
                <Link to="/listeners">Listeners</Link>
                <Link to="/follows">Follows</Link>
                <Link to="/addmusic">Add Music</Link>
                <Link to="/addartist">Add Artist</Link>
                <Link to="/addlistener">Add Listener</Link>
                <Link to="/addfollow">Add Follow</Link>
                <Link to="/addlike">Add Like</Link>
                <LogoutMobile onClick={handleSignOut}>
                    <AiOutlinePoweroff />
                    <i>logout</i>
                </LogoutMobile>
            </div>
            <Content>
                <nav id="navHorizontal">
                    <div id="dropdown">
                        <button type="button" id="dropbtn">
                            Add
                        </button>
                        <div id="dropdown-content">
                            <Link to="/addmusic">Add Music</Link>
                            <Link to="/addartist">Add Artist</Link>
                            <Link to="/addlistener">Add Listener</Link>
                            <Link to="/addfollow">Add Follow</Link>
                            <Link to="/addlike">Add Like</Link>
                        </div>
                    </div>
                    <div id="dropdown">
                        <button type="button" id="dropbtn">
                            List
                        </button>
                        <div id="dropdown-content">
                            <Link to="/home">Musics</Link>
                            <Link to="/artists">Artists</Link>
                            <Link to="/listeners">Listeners</Link>
                            <Link to="/follows">Follows</Link>
                        </div>
                    </div>
                </nav>
                <button
                    type="button"
                    id="navVertical"
                    onClick={handleShowSideBar}
                >
                    {showSideBar ? (
                        <AiOutlineCloseCircle size={25} />
                    ) : (
                        <AiOutlineBars size={25} />
                    )}
                </button>
                {/**
                     *
                <Search>
                    <AiOutlineSearch size={35} />
                    <input
                        type="text"
                        placeholder="Search for any music here..."
                    />
                </Search>
                     */}
                <Logout onClick={handleSignOut}>
                    <AiOutlinePoweroff />
                    <i id="logoutText">logout</i>
                </Logout>
            </Content>
        </Container>
    );
};

export default Header;
