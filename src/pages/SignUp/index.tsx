import React from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { Container, Content, Background } from './styles';
import Logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
    <>
        <Container>
            <Content>
                <img src={Logo} alt="Logo" />
                <form>
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
                    <Button>Create Account</Button>
                </form>
                <div id="bar" />
                <h4>Já tem uma conta?</h4>
                <a href="bola/gato">Login</a>
            </Content>
            <Background />
        </Container>
    </>
);

export default SignUp;
