import React, { useCallback, useRef } from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/authContext';

interface SignInFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn, user } = useAuth();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                    password: Yup.string().required('Password obrigatório'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
        },
        [signIn],
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
                        <Button type="submit">Login</Button>
                    </Form>
                    <div id="bar" />
                    <h4>Não tem uma conta?</h4>
                    <a href="bola/gato">SignUP</a>
                </Content>
                <Background />
            </Container>
        </>
    );
};

export default Login;
