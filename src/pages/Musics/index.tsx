import React, { useEffect, useState, useCallback } from 'react';
import {
    AiOutlineClockCircle,
    AiOutlineDelete,
    AiOutlineEdit,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Foot from '../../components/Foot';
import Logo from '../../assets/logo-only.svg';
import api from '../../services/api';
import { Container, Image, MusicList, MusicListTitle, Music } from './styles';

interface MusicProps {
    id: number;
    nome: string;
    duracao: number;
}

const Musics: React.FC = () => {
    const [MusicsResponse, setMusicsResponse] = useState<MusicProps[]>(
        [] as MusicProps[],
    );

    const handleDeleteMusic = useCallback((id: number) => {
        api.delete(`/v1/musica/${id}/`).then(response => {
            if (response.status === 204) {
                // eslint-disable-next-line
                alert('Musica excluída');
                loadMusics();
            } else {
                // eslint-disable-next-line
                alert('Musica não foi excluída');
            }
        });
    }, []);

    const loadMusics = useCallback(() => {
        api.get('/v1/musica/').then(response => {
            const data = response.data as MusicProps[];
            if (data.length > 0) setMusicsResponse(data);
        });
    }, []);

    useEffect(() => {
        loadMusics();
    }, [loadMusics]);

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
                    {!!MusicsResponse &&
                        MusicsResponse.map(musicItem => (
                            <Music key={musicItem.id}>
                                <div id="musicID">{musicItem.id}</div>
                                <div id="musicName">{musicItem.nome}</div>
                                <div id="musicDuration">
                                    {musicItem.duracao
                                        .toString()
                                        .replaceAll('.', ':')}
                                </div>
                                <a id="musicEdit" href="brunosana.com.br">
                                    <AiOutlineEdit size={18} />
                                </a>
                                <button
                                    type="button"
                                    id="musicDelete"
                                    onClick={() =>
                                        // eslint-disable-next-line
                                        handleDeleteMusic(musicItem.id)}
                                >
                                    <AiOutlineDelete size={18} />
                                </button>
                            </Music>
                        ))}
                </MusicList>
            </Container>
            <Foot />
        </>
    );
};

export default Musics;
