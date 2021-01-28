import React, { useCallback, useRef } from 'react';
import {
    AiOutlineMail,
    AiOutlineLock,
    AiOutlineCalendar,
} from 'react-icons/ai';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpProps {
    email: string;
    password: string;
    birthday: Date;
}

interface Response {
    id: number;
    username: string;
    email: string;
    age: number;
    birthday: Date;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignUpProps) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail obrigatório'),
                    password: Yup.string().min(
                        5,
                        'Senha de pelo menos 5 dígitos',
                    ),
                    birthday: Yup.date()
                        .typeError('Precisa ser uma data válida')
                        .required('Data de Nascimento obrigatório'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                const response = await api.post('/v1/users/', data);
                const user = response.data as Response;
                if (!user) {
                    // eslint-disable-next-line
                alert('Usuário não cadastrado, tente novamente!');
                } else {
                    // eslint-disable-next-line
                alert('Conta criada com sucesso!');
                    history.push('/');
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
            <Container>
                <Content>
                    <img src={Logo} alt="Logo" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name="email"
                            icon={AiOutlineMail}
                            placeholder="Email"
                        />
                        <Input
                            name="password"
                            type="password"
                            icon={AiOutlineLock}
                            placeholder="Password"
                        />
                        <Input
                            name="birthday"
                            icon={AiOutlineCalendar}
                            placeholder="Data de Nascimento"
                            type="date"
                        />
                        <Button type="submit">Create Account</Button>
                    </Form>
                    <div id="bar" />
                    <h4>Já tem uma conta?</h4>
                    <Link to="/">Login</Link>
                </Content>
                <Background />
            </Container>
        </>
    );
};

export default SignUp;
