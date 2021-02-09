import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Foot from '../../components/Foot';
import Logo from '../../assets/logo-only.svg';
import api from '../../services/api';
import { Container, Image, Table } from './styles';

interface Record {
    id: number;
    artista: string;
    musica: string;
}

const Records: React.FC = () => {
    const [RecordsResponse, setRecordsResponse] = useState<Record[]>(
        [] as Record[],
    );

    const handleDeleteLike = useCallback((id: number) => {
        api.delete(`/v1/grava/${id}/`).then(response => {
            if (response.status === 204) {
                // eslint-disable-next-line
                alert('Gravação excluída');
                loadRecords();
            } else {
                // eslint-disable-next-line
                alert('Gravação não foi excluída');
            }
        });
    }, []);

    const loadRecords = useCallback(() => {
        api.get('/v1/grava/').then(response => {
            const data = response.data as Record[];
            if (data.length > 0) setRecordsResponse(data);
        });
    }, []);

    useEffect(() => {
        loadRecords();
    }, [loadRecords]);

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
                        <th>musica</th>
                        <th>.</th>
                    </tr>
                    {!!RecordsResponse &&
                        RecordsResponse.map(recordItem => (
                            <tr key={recordItem.id}>
                                <td>{recordItem.id}</td>
                                <td>{recordItem.artista}</td>
                                <td>{recordItem.musica}</td>
                                <td id="editCell">
                                    <Link
                                        id="listenerEdit"
                                        to={`/editrecord/${recordItem.id}/${recordItem.artista}/${recordItem.musica}`}
                                    >
                                        <AiOutlineEdit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        id="listenerDelete"
                                        onClick={() =>
                                            // eslint-disable-next-line
                                            handleDeleteLike(recordItem.id)}
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

export default Records;
