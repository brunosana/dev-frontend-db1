import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Foot from '../../components/Foot';
import Logo from '../../assets/logo-only.svg';
import api from '../../services/api';
import { Container, Image, Table } from './styles';

interface Follower {
    id: number;
    ouvinte: string;
    artista: string;
}

const Follows: React.FC = () => {
    const [FollowsResponse, setFollowsResponse] = useState<Follower[]>(
        [] as Follower[],
    );

    const handleDeleteFollower = useCallback((id: number) => {
        api.delete(`/v1/segue/${id}/`).then(response => {
            if (response.status === 204) {
                // eslint-disable-next-line
                alert('Follow excluído');
                loadFollows();
            } else {
                // eslint-disable-next-line
                alert('Follow não foi excluído');
            }
        });
    }, []);

    const loadFollows = useCallback(() => {
        api.get('/v1/segue/').then(response => {
            const data = response.data as Follower[];
            if (data.length > 0) setFollowsResponse(data);
        });
    }, []);

    useEffect(() => {
        loadFollows();
    }, [loadFollows]);

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
                        <th>artista</th>
                        <th>ouvinte</th>
                        <th>.</th>
                    </tr>
                    {!!FollowsResponse &&
                        FollowsResponse.map(followItem => (
                            <tr key={followItem.id}>
                                <td>{followItem.id}</td>
                                <td>{followItem.artista}</td>
                                <td>{followItem.ouvinte}</td>
                                <td id="editCell">
                                    <Link
                                        id="listenerEdit"
                                        to={`/editfollow/${followItem.id}/${followItem.artista}/${followItem.ouvinte}`}
                                    >
                                        <AiOutlineEdit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        id="listenerDelete"
                                        onClick={() =>
                                            // eslint-disable-next-line
                                            handleDeleteFollower(followItem.id)}
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

export default Follows;
