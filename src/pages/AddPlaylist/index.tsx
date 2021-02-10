import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { Content, Container, Background, FormArea } from './styles';

interface AddPlaylistFOrmData {
    user_email: string;
    playlist_nome: string;
}

const AddPlaylist: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleAddPlaylist = useCallback(
        async (data: AddPlaylistFOrmData) => {
            try {
                const schema = Yup.object().shape({
                    user_email: Yup.string().required('Email obrigatório'),
                    playlist_nome: Yup.string().required(
                        'Playlist obrigatória',
                    ),
                });
                const { user_email, playlist_nome } = data;
                await schema.validate(
                    { user_email, playlist_nome },
                    {
                        abortEarly: false,
                    },
                );
                try {
                    const response = await api.post('/v1/cria/', {
                        user_email,
                        playlist: {
                            nome: playlist_nome,
                            enumeração: true,
                        },
                    });
                    if (response.status === 201) {
                        history.push('/playlists');
                    } else {
                        // eslint-disable-next-line
                        alert('Playlist não criada!');
                    }
                } catch (err) {
                    // eslint-disable-next-line
                    alert('Playlist não criada!');
                }
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [history],
    );
    return (
        <>
            <Header />
            <Content>
                <Background />
                <Container>
                    <FormArea>
                        <div>Add Playlist</div>
                        <Form ref={formRef} onSubmit={handleAddPlaylist}>
                            <Input
                                type="text"
                                name="user_email"
                                id="user_email"
                                placeholder="User email..."
                            />
                            <Input
                                type="text"
                                name="playlist_nome"
                                id="playlist_nome"
                                placeholder="Playlist name..."
                            />
                            <Button type="submit">Enviar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default AddPlaylist;
