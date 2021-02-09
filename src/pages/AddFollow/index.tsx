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

interface AddFollowFOrmData {
    ouvinte_email: string;
    artista_email: string;
}

const AddFollow: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleAddFollow = useCallback(
        async (data: AddFollowFOrmData) => {
            try {
                const schema = Yup.object().shape({
                    ouvinte_email: Yup.string().required('Ouvinte obrigatório'),
                    artista_email: Yup.string().required('Artista obrigatório'),
                });
                const { ouvinte_email, artista_email } = data;
                await schema.validate(
                    { ouvinte_email, artista_email },
                    {
                        abortEarly: false,
                    },
                );
                try {
                    const response = await api.post('/v1/segue/', data);
                    if (response.status === 201) {
                        history.push('/home');
                    } else {
                        // eslint-disable-next-line
                        alert('Follow não adicionada');
                    }
                } catch (err) {
                    // eslint-disable-next-line
                    alert('Follow não adicionado');
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
                        <div>Add Follow</div>
                        <Form ref={formRef} onSubmit={handleAddFollow}>
                            <Input
                                type="text"
                                name="ouvinte_email"
                                id="ouvinte_email"
                                placeholder="Listener email..."
                            />
                            <Input
                                type="text"
                                name="artista_email"
                                id="artista_email"
                                placeholder="Artist email..."
                            />
                            <Button type="submit">Enviar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default AddFollow;
