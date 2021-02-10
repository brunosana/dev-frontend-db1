import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Foot from '../../components/Foot';
import Logo from '../../assets/logo-only.svg';
import api from '../../services/api';
import { Container, Image, Table } from './styles';

interface PlaylistProps {
    id: number;
    nome: string;
    enumeração: boolean;
}

const Playlists: React.FC = () => {
    const [PlaylistsResponse, setPlaylistsResponse] = useState<PlaylistProps[]>(
        [] as PlaylistProps[],
    );

    const handleDeletePlaylist = useCallback((id: number) => {
        api.delete(`/v1/playlist/${id}/`).then(response => {
            if (response.status === 204) {
                // eslint-disable-next-line
                alert('Playlist excluída');
                loadPlaylists();
            } else {
                // eslint-disable-next-line
                alert('Playlist não foi excluída');
            }
        });
    }, []);

    const loadPlaylists = useCallback(() => {
        api.get('/v1/playlist/').then(response => {
            const data = response.data as PlaylistProps[];
            if (data.length > 0) setPlaylistsResponse(data);
        });
    }, []);

    useEffect(() => {
        loadPlaylists();
    }, [loadPlaylists]);

    return (
        <>
            <Header />
            <Container>
                <Image>
                    <img src={Logo} alt="Free Musics Database Icon" />
                </Image>
                <Table>
                    <tr id="TableHead">
                        <th>id</th>
                        <th>nome</th>
                        <th>enumeração</th>
                        <th>.</th>
                    </tr>
                    {!!PlaylistsResponse &&
                        PlaylistsResponse.map(playlistItem => (
                            <tr key={playlistItem.id}>
                                <td>{playlistItem.id}</td>
                                <td>{playlistItem.nome}</td>
                                <td>
                                    {playlistItem.enumeração ? 'sim' : 'não'}
                                </td>
                                <td id="editCell">
                                    <Link
                                        id="listenerEdit"
                                        to={`/editplaylist/${playlistItem.id}/${playlistItem.nome}/${playlistItem.enumeração}`}
                                    >
                                        <AiOutlineEdit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        id="listenerDelete"
                                        onClick={() =>
                                            // eslint-disable-next-line
                                            handleDeletePlaylist(playlistItem.id)}
                                    >
                                        <AiOutlineDelete size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </Table>
            </Container>
            <Foot />
        </>
    );
};

export default Playlists;
