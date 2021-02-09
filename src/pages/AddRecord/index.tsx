import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { Content, Container, Background, FormArea } from './styles';

interface AddRecordFOrmData {
    artista_email: string;
    musica: string;
}

const AddRecord: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleAddRecord = useCallback(
        async (data: AddRecordFOrmData) => {
            try {
                const schema = Yup.object().shape({
                    artista_email: Yup.string().required(
                        'Email do artista obrigatório',
                    ),
                    musica: Yup.number()
                        .typeError('Precisa ser um número')
                        .required('Id obrigatório'),
                });
                const { artista_email, musica } = data;
                const musicaValue = parseFloat(
                    musica.replaceAll(',', '.').replaceAll(':', '.'),
                );
                await schema.validate(
                    { artista_email, musica: musicaValue },
                    {
                        abortEarly: false,
                    },
                );
                try {
                    const response = await api.post('/v1/grava/', data);
                    if (response.status === 201) {
                        history.push('/records');
                    } else {
                        // eslint-disable-next-line
                        alert('Gravação não adicionada');
                    }
                } catch (err) {
                    // eslint-disable-next-line
                    alert('Gravação não adicionada');
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
            <Header />
            <Content>
                <Background />
                <Container>
                    <FormArea>
                        <div>Add Record</div>
                        <Form ref={formRef} onSubmit={handleAddRecord}>
                            <Input
                                type="text"
                                name="artista_email"
                                id="artista_email"
                                placeholder="Artist email..."
                            />
                            <Input
                                type="text"
                                name="musica"
                                id="musica"
                                placeholder="Music id..."
                            />
                            <Button type="submit">Enviar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default AddRecord;
