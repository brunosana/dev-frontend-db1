import React, { useState } from 'react';
import {
    AiOutlineSearch,
    AiOutlinePoweroff,
    AiOutlineBars,
    AiOutlineCloseCircle,
} from 'react-icons/ai';
import { Container, Content, Search, Logout } from './styles';

const Header: React.FC = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    function handleShowSideBar() {
        setShowSideBar(!showSideBar);
    }

    return (
        <Container showSideBar={showSideBar}>
            <div id="sideBar">
                <a href="oi">Home</a>
                <a href="oi">Add Music</a>
                <a href="oi">Logout</a>
            </div>
            <Content>
                <nav id="navHorizontal">
                    <a href="oi">Home</a>
                    <a href="oi">Add Music</a>
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
                <Logout>
                    <AiOutlinePoweroff />
                    <i id="logoutText">logout</i>
                </Logout>
            </Content>
        </Container>
    );
};

export default Header;
