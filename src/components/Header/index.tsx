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
                <Link to="/home">Home</Link>
                <Link to="/addmusic">Add Music</Link>
                <LogoutMobile onClick={handleSignOut}>
                    <AiOutlinePoweroff />
                    <i>logout</i>
                </LogoutMobile>
            </div>
            <Content>
                <nav id="navHorizontal">
                    <Link to="/home">Home</Link>
                    <Link to="/addmusic">Add Music</Link>
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
                <Search>
                    <AiOutlineSearch size={35} />
                    <input
                        type="text"
                        placeholder="Search for any music here..."
                    />
                </Search>
                <Logout onClick={handleSignOut}>
                    <AiOutlinePoweroff />
                    <i id="logoutText">logout</i>
                </Logout>
            </Content>
        </Container>
    );
};

export default Header;
