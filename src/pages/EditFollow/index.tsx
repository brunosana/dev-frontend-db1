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

interface Follower {
    id: string;
    ouvinte: string;
    artista: string;
}

interface MusicEditProps {
    ouvinte_email: string;
    artista_email: string;
}

const EditFollow: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { params } = useRouteMatch<Follower>();
    const handleSubmit = useCallback(
        async (data: MusicEditProps) => {
            try {
                const schema = Yup.object().shape({
                    ouvinte_email: Yup.string().required('Ouvinte necessário'),
                    artista_email: Yup.string().required('Artista necessário'),
                });
                const { ouvinte_email, artista_email } = data;
                await schema.validate(data, {
                    abortEarly: false,
                });
                const response = await api.put(`/v1/segue/${params.id}/`, {
                    ouvinte_email,
                    artista_email,
                });
                if (response.status === 200) {
                    // eslint-disable-next-line
                    alert("Follow alterado!");
                    history.push('/follows');
                } else {
                    // eslint-disable-next-line
                    alert("Follow não alterado! Tente novamente");
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
                        <div>Edit Music</div>
                        <Form
                            key={params.id}
                            onSubmit={handleSubmit}
                            ref={formRef}
                        >
                            <Input
                                type="text"
                                name="artista_email"
                                id="artista_email"
                                placeholder="Artist email..."
                                defaultValue={params.artista}
                            />
                            <Input
                                type="text"
                                name="ouvinte_email"
                                id="ouvinte_email"
                                placeholder="Ouvinte email..."
                                defaultValue={params.ouvinte}
                            />
                            <Button type="submit">Editar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default EditFollow;
