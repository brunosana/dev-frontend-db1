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

interface ListenerProps {
    id: string;
    phone: string;
    primeiro_nome: string;
    sobrenome: string;
    user: string;
}

const EditListener: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { params } = useRouteMatch<ListenerProps>();
    const handleSubmit = useCallback(
        async (data: ListenerProps) => {
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
                    user: Yup.string().required('Email obrigatório'),
                });
                const { phone, primeiro_nome, sobrenome, user } = data;
                await schema.validate(
                    { phone, primeiro_nome, sobrenome, user },
                    {
                        abortEarly: false,
                    },
                );
                const response = await api.put(`/v1/ouvinte/${params.id}/`, {
                    phone,
                    primeiro_nome,
                    sobrenome,
                    user_email: user,
                });
                if (response.status === 200) {
                    // eslint-disable-next-line
                    alert("Ouvinte alterado!");
                    history.push('/listeners');
                } else {
                    // eslint-disable-next-line
                    alert("Ouvinte não alterado! Tente novamente");
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
                                name="phone"
                                id="phone"
                                placeholder="Name..."
                                defaultValue={params.phone}
                            />
                            <Input
                                type="text"
                                name="primeiro_nome"
                                id="primeiro_nome"
                                placeholder="Biography..."
                                defaultValue={params.primeiro_nome}
                            />
                            <Input
                                type="text"
                                name="sobrenome"
                                id="sobrenome"
                                placeholder="Formation Year..."
                                defaultValue={params.sobrenome}
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

export default EditListener;
