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

interface AddArtistFOrmData {
    stage_name: string;
    biography: string;
    formation_year: number;
    user_email: string;
}

const AddArtist: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleEditMusic = useCallback(
        async (data: AddArtistFOrmData) => {
            try {
                const schema = Yup.object().shape({
                    stage_name: Yup.string().required(
                        'Nome do artista obrigatório',
                    ),
                    biography: Yup.string().required('Biografia obrigatória'),
                    formation_year: Yup.number()
                        .min(1000)
                        .typeError('Insira um ano válido'),
                    user_email: Yup.string().required('Email Obrigatório'),
                });
                const {
                    stage_name,
                    biography,
                    formation_year,
                    user_email,
                } = data;
                await schema.validate(
                    { stage_name, biography, formation_year, user_email },
                    {
                        abortEarly: false,
                    },
                );
                const response = await api.post('/v1/artista/', data);
                if (response.status === 201) {
                    history.push('/home');
                } else {
                    // eslint-disable-next-line
                    alert('Artista não adicionado');
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
                        <div>Add Artist</div>
                        <Form ref={formRef} onSubmit={handleEditMusic}>
                            <Input
                                type="text"
                                name="stage_name"
                                id="stage_name"
                                placeholder="Artist name..."
                            />
                            <Input
                                type="text"
                                name="biography"
                                id="biography"
                                placeholder="Artist biography..."
                            />
                            <Input
                                type="number"
                                min="1000"
                                step="1"
                                name="formation_year"
                                id="formation_year"
                                placeholder="Formation Year..."
                            />
                            <Input
                                type="text"
                                name="user_email"
                                id="user_email"
                                placeholder="User email..."
                            />
                            <Button type="submit">Enviar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default AddArtist;
