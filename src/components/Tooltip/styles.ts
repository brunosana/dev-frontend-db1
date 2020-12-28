import styled, { css } from 'styled-components';

interface TooltipProps {
    isVisible: boolean;
}

export const Box = styled.div<TooltipProps>`
    position: absolute;
    top: 1%;
    right: 5%;
    z-index: 1;
    width: 220px;
    resize: both;
    background: ${props => props.color};
    border: 0;
    border-radius: 7px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    animation-name: moveIn;
    animation-duration: 200ms;
    animation-fill-mode: backwards;

    #message {
        padding: 14px;
        font-style: normal;
        display: flex;
        align-items: center;
        justify-content: start;
    }

    button {
        background: none;
        border: none;
        color: #fff;
        position: absolute;
        top: 2%;
        right: 2%;
    }

    @keyframes moveIn {
        from {
            transform: translateX(150px);
            transform: opacity(0%);
        }
        to {
            transform: translateX(0px);
            transform: opacity(100%);
        }
    }
    ${props =>
        props.isVisible &&
        css`
            display: none;
        `}
`;
