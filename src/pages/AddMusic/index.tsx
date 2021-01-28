import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Content, Container, Background, FormArea } from './styles';

interface AddMusicFOrmData {
    name: string;
    duration: string;
}

const AddMusic: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleEditMusic = useCallback(async (data: AddMusicFOrmData) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome da música obrigatório'),
                duration: Yup.number()
                    .typeError('Precisa ser um número')
                    .required('Duração obrigatória'),
            });
            const { name, duration } = data;
            const durationValue = parseFloat(duration.replaceAll(',', '.'));
            await schema.validate(
                { name, duration: durationValue },
                {
                    abortEarly: false,
                },
            );
        } catch (err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <>
            <Header />
            <Content>
                <Background />
                <Container>
                    <FormArea>
                        <div>Add Music</div>
                        <Form ref={formRef} onSubmit={handleEditMusic}>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Music name..."
                            />
                            <Input
                                type="text"
                                name="duration"
                                id="duration"
                                placeholder="Music duration..."
                            />
                            <Button type="submit">Enviar</Button>
                        </Form>
                    </FormArea>
                </Container>
            </Content>
        </>
    );
};

export default AddMusic;
