import React from 'react';
import { AiOutlineSearch, AiOutlinePoweroff } from 'react-icons/ai';
import { Container, Content, Search, Logout } from './styles';

const Header: React.FC = () => (
    <Container>
        <Content>
            <nav>
                <a href="oi">Home</a>
                <a href="oi">Add Music</a>
            </nav>
            <Search>
                <AiOutlineSearch size={35} />
                <input type="text" placeholder="Search for any music here..." />
            </Search>
            <Logout>
                <AiOutlinePoweroff />
                logout
            </Logout>
        </Content>
    </Container>
);

export default Header;
