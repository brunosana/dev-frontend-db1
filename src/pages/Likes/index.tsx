import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Foot from '../../components/Foot';
import Logo from '../../assets/logo-only.svg';
import api from '../../services/api';
import { Container, Image, Table } from './styles';

interface LikeProps {
    id: number;
    ouvinte: string;
    musica: string;
}

const Likes: React.FC = () => {
    const [LikesResponse, setLikesResponse] = useState<LikeProps[]>(
        [] as LikeProps[],
    );

    const handleDeleteLike = useCallback((id: number) => {
        api.delete(`/v1/curte/${id}/`).then(response => {
            if (response.status === 204) {
                // eslint-disable-next-line
                alert('Curtir excluído');
                loadLikes();
            } else {
                // eslint-disable-next-line
                alert('Curtir não foi excluído');
            }
        });
    }, []);

    const loadLikes = useCallback(() => {
        api.get('/v1/curte/').then(response => {
            const data = response.data as LikeProps[];
            if (data.length > 0) setLikesResponse(data);
        });
    }, []);

    useEffect(() => {
        loadLikes();
    }, [loadLikes]);

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
                        <th>ouvinte</th>
                        <th>musica</th>
                        <th>.</th>
                    </tr>
                    {!!LikesResponse &&
                        LikesResponse.map(likeItem => (
                            <tr key={likeItem.id}>
                                <td>{likeItem.id}</td>
                                <td>{likeItem.ouvinte}</td>
                                <td>{likeItem.musica}</td>
                                <td id="editCell">
                                    <Link
                                        id="listenerEdit"
                                        to={`/editlike/${likeItem.id}/${likeItem.ouvinte}/${likeItem.musica}`}
                                    >
                                        <AiOutlineEdit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        id="listenerDelete"
                                        onClick={() =>
                                            // eslint-disable-next-line
                                            handleDeleteLike(likeItem.id)}
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

export default Likes;
