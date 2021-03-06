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

interface Record {
    id: string;
    artista: string;
    musica: string;
}

interface RecordEdit {
    artista_email: string;
    musica: string;
}

const EditRecord: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const { params } = useRouteMatch<Record>();
    const handleSubmit = useCallback(
        async (data: RecordEdit) => {
            try {
                const schema = Yup.object().shape({
                    artista_email: Yup.string().required('Artista necessário'),
                    musica: Yup.number()
                        .typeError('Precisa ser um número')
                        .required('Id obrigatório'),
                });
                const { artista_email, musica } = data;
                await schema.validate(data, {
                    abortEarly: false,
                });
                try {
                    const response = await api.put(`/v1/grava/${params.id}/`, {
                        artista_email,
                        musica,
                    });
                    if (response.status === 200) {
                        // eslint-disable-next-line
                        alert("Curtir alterado!");
                        history.push('/records');
                    } else {
                        // eslint-disable-next-line
                        alert("Gravação não alterada! Tente novamente");
                    }
                } catch (err) {
                    // eslint-disable-next-line
                    alert("Gravação não alterada! Tente novamente");
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
                                name="musica"
                                id="musica"
                                placeholder="Music id..."
                                defaultValue={params.musica}
                            />
                            <Button type="submit">Editar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default EditRecord;
