import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #282828;
    border-radius: 7px;
    padding: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    border: 2px solid #fff;
    color: #fff;
    ${props =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${props =>
        props.isFocused &&
        css`
            color: #ff9000;
            border-color: #ff9000;
        `}

    ${props =>
        props.isFilled &&
        css`
            color: #ff9000;
        `}

    input {
        color: #fff;
        flex: 1;
        border: 0;
        background: transparent;
        font-size: 14px;
        &::placeholder {
            color: #ddd;
        }
    }
    svg {
        margin-right: 16px;
    }
    & + div {
        margin-top: 8px;
    }
    #spanButton {
        margin: 0;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    sgv {
        margin: 0;
    }
    span {
        background: #c53030;
        color: #fff;
        &::before {
            border-color: #c53030 transparent;
        }
    }
    &:hover span {
        opacity: 1;
    }
`;
