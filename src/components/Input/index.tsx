import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon: React.ComponentType<IconBaseProps>;
    name: string;
}

// eslint-disable-next-line react/prop-types
const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
    <Container>
        {Icon && <Icon size={20} />}
        <input {...rest} />
    </Container>
);

export default Input;