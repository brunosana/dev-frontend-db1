import React, { useCallback, useRef } from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                username: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('E-mail inválido'),
                password: Yup.string().min(5, 'Senha de pelo menos 5 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, []);
    return (
        <>
            <Container>
                <Content>
                    <img src={Logo} alt="Logo" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name="username"
                            icon={AiOutlineUser}
                            placeholder="Username"
                        />
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
                        <Button type="submit">Create Account</Button>
                    </Form>
                    <div id="bar" />
                    <h4>Já tem uma conta?</h4>
                    <a href="bola/gato">Login</a>
                </Content>
                <Background />
            </Container>
        </>
    );
};

export default SignUp;
