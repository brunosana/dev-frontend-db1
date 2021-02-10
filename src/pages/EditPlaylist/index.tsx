import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Content, Container, Background, FormArea } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface Playlist {
    id: string;
    nome: string;
    enumeracao: string;
}

interface PlaylistResponse {
    id: number;
    user: string;
    playlist: {
        id: number;
        nome: string;
        enumeração: boolean;
    };
    data_de_criacao: Date;
}

interface PlaylistEditProps {
    user_email: string;
    nome: string;
}

const EditPlaylist: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { params } = useRouteMatch<Playlist>();
    const [playlistResponse, setPlaylistResponse] = useState<PlaylistResponse>(
        {} as PlaylistResponse,
    );
    const handleSubmit = useCallback(
        async (data: PlaylistEditProps) => {
            try {
                const schema = Yup.object().shape({
                    user_email: Yup.string().required('Email necessário'),
                    nome: Yup.string().required('Nome da playlist necessário'),
                });
                const { user_email, nome } = data;
                await schema.validate(data, {
                    abortEarly: false,
                });
                try {
                    const response = await api.put(
                        `/v1/cria/${playlistResponse.id}/`,
                        {
                            id: playlistResponse.id,
                            user_email,
                            playlist: {
                                id: params.id,
                                nome,
                                enumeração: true,
                            },
                        },
                    );
                    if (response.status === 200) {
                        // eslint-disable-next-line
                        alert("Playlist alterada!");
                        history.push('/playlists');
                    } else {
                        // eslint-disable-next-line
                        alert("Playlist não alterada! Tente novamente");
                    }
                } catch (err) {
                    // eslint-disable-next-line
                    alert("Playlist não alterada! Tente novamente");
                }
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [params.id, playlistResponse?.id, history],
    );

    useEffect(() => {
        api.get(`/v1/cria/`).then(response => {
            const data = response.data as PlaylistResponse[];
            if (data) {
                const idOfPlaylist = Number(params.id);
                const currentPlaylistID = data.findIndex(
                    curr => curr.playlist.id === idOfPlaylist,
                );
                setPlaylistResponse(data[currentPlaylistID]);
            }
        });
    }, [params.id]);
    return (
        <>
            <Header />
            <Content>
                <Background />
                <Container>
                    <FormArea>
                        <div>Edit Playlist</div>
                        {playlistResponse ? (
                            <Form
                                key={params.id}
                                onSubmit={handleSubmit}
                                ref={formRef}
                            >
                                <Input
                                    type="text"
                                    name="user_email"
                                    id="user_email"
                                    placeholder="User email..."
                                    defaultValue={playlistResponse.user}
                                />
                                <Input
                                    type="text"
                                    name="nome"
                                    id="nome"
                                    placeholder="Playlist name..."
                                    defaultValue={params.nome}
                                />
                                <Button type="submit">Editar</Button>
                            </Form>
                        ) : (
                            <p>Loading</p>
                        )}
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default EditPlaylist;
