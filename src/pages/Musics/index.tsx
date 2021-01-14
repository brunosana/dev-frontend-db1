import React from 'react';
import {
    AiOutlineClockCircle,
    AiOutlineDelete,
    AiOutlineEdit,
} from 'react-icons/ai';
import Header from '../../components/Header';
import Logo from '../../assets/logo-only.svg';
import { Container, Image, MusicList, MusicListTitle, Music } from './styles';

const Musics: React.FC = () => {
    return (
        <>
            <Header />
            <Container>
                <Image>
                    <img src={Logo} alt="Free Musics Database Icon" />
                </Image>
                <MusicList>
                    <MusicListTitle>
                        <div id="id">ID</div>
                        <div id="name">Name</div>
                        <div id="duration">
                            <AiOutlineClockCircle size={15} />
                        </div>
                        <div id="line" />
                    </MusicListTitle>
                    <Music>
                        <div id="musicID">12345</div>
                        <div id="musicName">Wind of Change</div>
                        <div id="musicDuration">5:00</div>
                        <a id="musicEdit" href="brunosana.com.br">
                            <AiOutlineEdit size={18} />
                        </a>
                        <a id="musicDelete" href="brunosana.com.br">
                            <AiOutlineDelete size={18} />
                        </a>
                    </Music>
                </MusicList>
            </Container>
        </>
    );
};

export default Musics;
