import React from 'react';

import { Container } from './styles';

interface TooltipProps {
    title: string;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    // eslint-disable-next-line
    title,
    // eslint-disable-next-line
    className = '',
    // eslint-disable-next-line
    children,
}) => {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    );
};

export default Tooltip;
