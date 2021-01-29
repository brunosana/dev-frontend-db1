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

interface MusicProps {
    id: string;
    nome: string;
    duracao: string;
}

interface MusicEditProps {
    nome: string;
    duracao: string;
}

const EditMusic: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { params } = useRouteMatch<MusicProps>();
    const handleSubmit = useCallback(
        async (data: MusicEditProps) => {
            try {
                const schema = Yup.object().shape({
                    nome: Yup.string().required('Nome necessário'),
                    duracao: Yup.number()
                        .typeError('Precisa ser um número')
                        .required('Duração obrigatória'),
                });
                const { nome, duracao } = data;
                const duracaoValue = parseFloat(
                    duracao.replaceAll(',', '.').replaceAll(':', '.'),
                );
                await schema.validate(data, {
                    abortEarly: false,
                });
                const response = await api.put(`/v1/musica/${params.id}/`, {
                    nome,
                    duracao: duracaoValue,
                });
                if (response.status === 200) {
                    // eslint-disable-next-line
                    alert("Música alterada!");
                    history.push('/home');
                } else {
                    // eslint-disable-next-line
                    alert("Música não alterada! Tente novamente");
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
                                name="nome"
                                id="name"
                                placeholder="Music name..."
                                defaultValue={params.nome}
                            />
                            <Input
                                type="text"
                                name="duracao"
                                id="duration"
                                placeholder="Music duration..."
                                defaultValue={params.duracao}
                            />
                            <Button type="submit">Editar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default EditMusic;
