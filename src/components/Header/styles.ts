import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: #000;
    display: flex;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        text-decoration: none;
        color: #fff;
        &:hover {
            color: ${shade(0.2, '#fff')};
        }
    }
    a + a {
        margin-left: 20px;
    }
`;

export const Search = styled.div`
    display: flex;
    align-items: center;
    background-color: #cfcfcf;
    color: #5f5f5f;
    padding: 4px 8px;
    border-radius: 4px;
    width: 600px;
    input {
        background: none;
        border: none;
        font-weight: bold;
        color: #5f5f5f;
        font-size: 16px;
        width: 100%;
    }
    svg {
        margin-right: 8px;
    }
`;

export const Logout = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    svg {
        margin-right: 5px;
    }

    &:hover {
        color: ${shade(0.2, '#fff')};
    }
`;
