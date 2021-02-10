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

interface UserProps {
    id: string;
    username: string;
    email: string;
    birthday: string;
    age: string;
}

interface UserEditProps {
    username: string;
    email: string;
    birthday: Date;
    age: string;
}

const EditUser: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { params } = useRouteMatch<UserProps>();
    const handleSubmit = useCallback(
        async (data: UserEditProps) => {
            try {
                const schema = Yup.object().shape({
                    username: Yup.string().required('Username obrigatório'),
                    email: Yup.string().required('E-mail obrigatório'),
                    birthday: Yup.date()
                        .typeError('Precisa ser uma data válida')
                        .required('Data de Nascimento obrigatório'),
                });
                const { username, email, birthday } = data;
                await schema.validate(data, {
                    abortEarly: false,
                });
                try {
                    const response = await api.patch(
                        `/v1/users/${params.id}/`,
                        {
                            username,
                            email,
                            birthday,
                        },
                    );
                    if (response.status === 200) {
                        // eslint-disable-next-line
                        alert("User alterado!");
                        history.push('/users');
                    } else {
                        // eslint-disable-next-line
                        alert("User não alterado! Tente novamente");
                    }
                } catch (err) {
                    // eslint-disable-next-line
                    alert("User não alterado! Tente novamente");
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
                        <div>Edit User</div>
                        <Form
                            key={params.id}
                            onSubmit={handleSubmit}
                            ref={formRef}
                        >
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username..."
                                defaultValue={params.username}
                            />
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="User email..."
                                defaultValue={params.email}
                            />
                            <Input
                                type="date"
                                name="birthday"
                                id="birthday"
                                placeholder="Birthday..."
                                defaultValue={params.birthday}
                            />
                            <Button type="submit">Editar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default EditUser;
