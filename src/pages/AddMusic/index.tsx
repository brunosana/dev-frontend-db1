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

interface AddMusicFOrmData {
    nome: string;
    duracao: string;
}

interface Response {
    id: number;
    nome: string;
    duracao: number;
}

const AddMusic: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleEditMusic = useCallback(async (data: AddMusicFOrmData) => {
        try {
            const schema = Yup.object().shape({
                nome: Yup.string().required('Nome da música obrigatório'),
                duracao: Yup.number()
                    .typeError('Precisa ser um número')
                    .required('Duração obrigatória'),
            });
            const { nome, duracao } = data;
            const duracaoValue = parseFloat(duracao.replaceAll(',', '.'));
            await schema.validate(
                { nome, duracao: duracaoValue },
                {
                    abortEarly: false,
                },
            );
            const response = await api.post('/v1/musica/', data);
            const music = response.data as Response;
            if (!music.id) {
                // eslint-disable-next-line
                alert('Musica não adicionada');
            } else {
                history.push('/home');
            }
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <>
            <Header />
            <Content>
                <Background />
                <Container>
                    <FormArea>
                        <div>Add Music</div>
                        <Form ref={formRef} onSubmit={handleEditMusic}>
                            <Input
                                type="text"
                                name="nome"
                                id="name"
                                placeholder="Music name..."
                            />
                            <Input
                                type="text"
                                name="duracao"
                                id="duration"
                                placeholder="Music duration..."
                            />
                            <Button type="submit">Enviar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default AddMusic;
