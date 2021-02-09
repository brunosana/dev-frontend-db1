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
import { Container, Image, Table } from './styles';
import Artist from '../../interfaces/artist';

const Artists: React.FC = () => {
    const [ArtistsResponse, setArtistsResponse] = useState<Artist[]>(
        [] as Artist[],
    );

    const loadArtists = useCallback(() => {
        api.get('/v1/artista/').then(response => {
            const data = response.data as Artist[];
            if (data.length > 0) setArtistsResponse(data);
        });
    }, []);
    const handleDeleteArtist = useCallback(
        (id: number) => {
            api.delete(`/v1/artista/${id}/`).then(response => {
                if (response.status === 204) {
                    // eslint-disable-next-line
                alert('Artista excluído');
                    loadArtists();
                } else {
                    // eslint-disable-next-line
                alert('Artista não foi excluído');
                }
            });
        },
        [loadArtists],
    );

    useEffect(() => {
        loadArtists();
    }, [loadArtists]);

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
                        <th>stage_name</th>
                        <th>biography</th>
                        <th>formation_year</th>
                        <th>user</th>
                        <th>.</th>
                    </tr>
                    {!!ArtistsResponse &&
                        ArtistsResponse.map(artistItem => (
                            <tr key={artistItem.id}>
                                <td>{artistItem.id}</td>
                                <td>{artistItem.stage_name}</td>
                                <td>{artistItem.biography}</td>
                                <td>{artistItem.formation_year}</td>
                                <td>{artistItem.user}</td>
                                <td id="editCell">
                                    <Link
                                        id="artistEdit"
                                        to={`/editartist/${artistItem.id}/${artistItem.stage_name}/${artistItem.biography}/${artistItem.formation_year}/${artistItem.user}`}
                                    >
                                        <AiOutlineEdit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        id="artistDelete"
                                        onClick={() =>
                                            // eslint-disable-next-line
                                        handleDeleteArtist(artistItem.id)}
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

export default Artists;
