import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    background: #fff;
    font-weight: bold;
    height: 47px;
    border-radius: 7px;
    border: 0;
    padding: 0 12px;
    color: #282828;
    width: 100%;
    margin-top: 14px;
    font-size: 14px;
    transition: background-color 0.2s;
    &:hover {
        background: ${shade(0.2, '#fff')};
        cursor: pointer;
    }
`;
