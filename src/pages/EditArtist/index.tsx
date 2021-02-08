import React, { useRef, useCallback } from 'react';
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

interface ArtistProps {
    id: string;
    stage_name: string;
    biography: string;
    formation_year: string;
    user: string;
}

interface ArtistEditProps {
    stage_name: string;
    biography: string;
    formation_year: string;
    user: string;
}

const EditArtist: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { params } = useRouteMatch<ArtistProps>();
    const handleSubmit = useCallback(
        async (data: ArtistEditProps) => {
            try {
                const schema = Yup.object().shape({
                    stage_name: Yup.string().required(
                        'Nome do artista obrigatório',
                    ),
                    biography: Yup.string().required('Biografia obrigatória'),
                    formation_year: Yup.number()
                        .min(1000)
                        .typeError('Insira um ano válido'),
                    user: Yup.string().required('Email Obrigatório'),
                });
                const { stage_name, biography, formation_year, user } = data;
                await schema.validate(
                    { stage_name, biography, formation_year, user },
                    {
                        abortEarly: false,
                    },
                );
                const response = await api.put(`/v1/artista/${params.id}/`, {
                    stage_name,
                    biography,
                    formation_year,
                    user_email: user,
                });
                if (response.status === 200) {
                    // eslint-disable-next-line
                    alert("Artista alterado!");
                    history.push('/artists');
                } else {
                    // eslint-disable-next-line
                    alert("Artista não alterado! Tente novamente");
                }
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [params.id, history],
    );
    return (
        <>
            <Header />
            <Content>
                <Background />
                <Container>
                    <FormArea>
                        <div>Edit Artist</div>
                        <Form
                            key={params.id}
                            onSubmit={handleSubmit}
                            ref={formRef}
                        >
                            <Input
                                type="text"
                                name="stage_name"
                                id="stage_name"
                                placeholder="Name..."
                                defaultValue={params.stage_name}
                            />
                            <Input
                                type="text"
                                name="biography"
                                id="biography"
                                placeholder="Biography..."
                                defaultValue={params.biography}
                            />
                            <Input
                                type="number"
                                min="1000"
                                step="1"
                                name="formation_year"
                                id="formation_year"
                                placeholder="Formation Year..."
                                defaultValue={params.formation_year}
                            />
                            <Input
                                type="text"
                                name="user"
                                id="user"
                                placeholder="User..."
                                defaultValue={params.user}
                            />
                            <Button type="submit">Editar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default EditArtist;
