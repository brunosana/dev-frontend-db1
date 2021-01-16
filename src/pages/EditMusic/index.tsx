import React from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Content, Container, Background, FormArea } from './styles';

const EditMusic: React.FC = () => {
    return (
        <>
            <Header />
            <Content>
                <Background />
                <Container>
                    <FormArea>
                        <div>Edit Music</div>
                        <form>
                            <Input
                                type="text"
                                name="Music"
                                id="name"
                                placeholder="Music name..."
                            />
                            <Input
                                type="text"
                                name="Duration"
                                id="duration"
                                placeholder="Music duration..."
                            />
                            <Button type="submit">Editar</Button>
                        </form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default EditMusic;
