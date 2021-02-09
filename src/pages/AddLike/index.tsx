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

interface AddLikeFOrmData {
    ouvinte_email: string;
    musica: string;
}

const AddLike: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleAddLike = useCallback(
        async (data: AddLikeFOrmData) => {
            try {
                const schema = Yup.object().shape({
                    ouvinte_email: Yup.string().required(
                        'Email do ouvinte obrigatório',
                    ),
                    musica: Yup.number()
                        .typeError('Precisa ser um número')
                        .required('Id obrigatório'),
                });
                const { ouvinte_email, musica } = data;
                const musicaValue = parseFloat(
                    musica.replaceAll(',', '.').replaceAll(':', '.'),
                );
                await schema.validate(
                    { ouvinte_email, musica: musicaValue },
                    {
                        abortEarly: false,
                    },
                );
                try {
                    const response = await api.post('/v1/curte/', data);
                    if (response.status === 201) {
                        history.push('/likes');
                    } else {
                        // eslint-disable-next-line
                        alert('Curtir não adicionado');
                    }
                } catch (err) {
                    // eslint-disable-next-line
                    alert('Curtir não adicionado');
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
                        <div>Add Like</div>
                        <Form ref={formRef} onSubmit={handleAddLike}>
                            <Input
                                type="text"
                                name="ouvinte_email"
                                id="ouvinte_email"
                                placeholder="Listener email..."
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

export default AddLike;
