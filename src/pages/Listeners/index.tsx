import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Foot from '../../components/Foot';
import Logo from '../../assets/logo-only.svg';
import api from '../../services/api';
import { Container, Image, Table } from './styles';
import Listener from '../../interfaces/listener';

const Listeners: React.FC = () => {
    const [ListenersResponse, setListenersResponse] = useState<Listener[]>(
        [] as Listener[],
    );

    const handleDeleteListener = useCallback((id: number) => {
        api.delete(`/v1/ouvinte/${id}/`).then(response => {
            if (response.status === 204) {
                // eslint-disable-next-line
                alert('Ouvinte excluído');
                loadListeners();
            } else {
                // eslint-disable-next-line
                alert('Ouvinte não foi excluído');
            }
        });
    }, []);

    const loadListeners = useCallback(() => {
        api.get('/v1/ouvinte/').then(response => {
            const data = response.data as Listener[];
            if (data.length > 0) setListenersResponse(data);
        });
    }, []);

    useEffect(() => {
        loadListeners();
    }, [loadListeners]);

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
                        <th>phone</th>
                        <th>primeiro_nome</th>
                        <th>sobrenome</th>
                        <th>user</th>
                        <th>.</th>
                    </tr>
                    {!!ListenersResponse &&
                        ListenersResponse.map(listenerItem => (
                            <tr key={listenerItem.id}>
                                <td>{listenerItem.id}</td>
                                <td>{listenerItem.phone}</td>
                                <td>{listenerItem.primeiro_nome}</td>
                                <td>{listenerItem.sobrenome}</td>
                                <td>{listenerItem.user}</td>
                                <td id="editCell">
                                    <Link
                                        id="listenerEdit"
                                        to={`/editlistener/${listenerItem.id}/${listenerItem.phone}/${listenerItem.primeiro_nome}/${listenerItem.sobrenome}/${listenerItem.user}`}
                                    >
                                        <AiOutlineEdit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        id="listenerDelete"
                                        onClick={() =>
                                            // eslint-disable-next-line
                                        handleDeleteListener(listenerItem.id)}
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

export default Listeners;
