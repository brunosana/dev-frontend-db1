import React, { useEffect, useState, useCallback } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Foot from '../../components/Foot';
import Logo from '../../assets/logo-only.svg';
import api from '../../services/api';
import { Container, Image, Table } from './styles';

interface User {
    id: number;
    username: string;
    birthday: string;
    email: string;
    age: number;
}

const Users: React.FC = () => {
    const [UsersResponse, setUsersResponse] = useState<User[]>([] as User[]);

    const handleDeleteUser = useCallback((id: number) => {
        api.delete(`/v1/users/${id}/`).then(response => {
            if (response.status === 204) {
                // eslint-disable-next-line
                alert('Usuário excluído');
                loadUsers();
            } else {
                // eslint-disable-next-line
                alert('Usuário não foi excluído');
            }
        });
    }, []);

    const loadUsers = useCallback(() => {
        api.get('/v1/users/').then(response => {
            const data = response.data as User[];
            if (data.length > 0) setUsersResponse(data);
        });
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

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
                        <th>username</th>
                        <th>email</th>
                        <th>birthday</th>
                        <th>age</th>
                        <th>.</th>
                    </tr>
                    {!!UsersResponse &&
                        UsersResponse.map(userItem => (
                            <tr key={userItem.id}>
                                <td>{userItem.id}</td>
                                <td>{userItem.username}</td>
                                <td>{userItem.email}</td>
                                <td>{userItem.birthday}</td>
                                <td>{userItem.age}</td>
                                <td id="editCell">
                                    <Link
                                        id="UserEdit"
                                        to={`/edituser/${userItem.id}/${userItem.username}/${userItem.birthday}/${userItem.email}/${userItem.age}`}
                                    >
                                        <AiOutlineEdit size={18} />
                                    </Link>
                                    <button
                                        type="button"
                                        id="UserDelete"
                                        onClick={() =>
                                            // eslint-disable-next-line
                                        handleDeleteUser(userItem.id)}
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

export default Users;
