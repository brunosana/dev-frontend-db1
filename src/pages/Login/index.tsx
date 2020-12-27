import React from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineLogin } from 'react-icons/ai';
import { Container, Content, Background } from './styles';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';

const Login: React.FC = () => (
    <>
        <Container>
            <Content>
                <img src={Logo} alt="Logo" />
                <form>
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
                </form>
                <a href="bola/gato">
                    <AiOutlineLogin />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    </>
);

export default Login;
