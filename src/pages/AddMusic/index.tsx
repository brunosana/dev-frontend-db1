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

interface AddMusicFormData {
    nome: string;
    duracao: string;
}

const AddMusic: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleAddMusic = useCallback(
        async (data: AddMusicFormData) => {
            try {
                const schema = Yup.object().shape({
                    nome: Yup.string().required('Nome da música obrigatório'),
                    duracao: Yup.number()
                        .typeError('Precisa ser um número')
                        .required('Duração obrigatória'),
                });
                const { nome, duracao } = data;
                const duracaoValue = parseFloat(
                    duracao.replaceAll(',', '.').replaceAll(':', '.'),
                );
                await schema.validate(
                    { nome, duracao: duracaoValue },
                    {
                        abortEarly: false,
                    },
                );
                const response = await api.post('/v1/musica/', data);
                if (response.status === 201) {
                    history.push('/home');
                } else {
                    // eslint-disable-next-line
                    alert('Musica não adicionada');
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
                        <div>Add Music</div>
                        <Form ref={formRef} onSubmit={handleAddMusic}>
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
