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

interface AddListenerFormData {
    phone: string;
    primeiro_nome: string;
    sobrenome: string;
    user_email: string;
}

const AddListener: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleEditMusic = useCallback(
        async (data: AddListenerFormData) => {
            try {
                const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
                const schema = Yup.object().shape({
                    phone: Yup.string()
                        .matches(phoneRegExp, 'Precisa ser um telefone')
                        .required('Telefone obrigatório'),
                    primeiro_nome: Yup.string().required(
                        'Primeiro Nome obrigatório',
                    ),
                    sobrenome: Yup.string().required(
                        'Sobrenome Nome obrigatório',
                    ),
                    user_email: Yup.string().required('Email obrigatório'),
                });
                const { phone, primeiro_nome, sobrenome, user_email } = data;
                await schema.validate(
                    { phone, primeiro_nome, sobrenome, user_email },
                    {
                        abortEarly: false,
                    },
                );
                const response = await api.post('/v1/ouvinte/', data);
                if (response.status === 201) {
                    history.push('/home');
                } else {
                    // eslint-disable-next-line
                    alert('Ouvinte não adicionado');
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
                        <div>Add Listener</div>
                        <Form ref={formRef} onSubmit={handleEditMusic}>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Phone..."
                            />
                            <Input
                                type="text"
                                name="primeiro_nome"
                                id="primeiro_nome"
                                placeholder="First Name..."
                            />
                            <Input
                                type="text"
                                name="sobrenome"
                                id="sobrenome"
                                placeholder="Last name..."
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

export default AddListener;
