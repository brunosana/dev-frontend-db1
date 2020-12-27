import styled from 'styled-components';
import { shade } from 'polished';
import pageLoginBackground from '../../assets/pageLoginBackground.jpg';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;

    form {
        margin: 40px 0;
        margin-bottom: 20px;
        width: 270px;
        text-align: center;
        align-items: center;
        h1 {
            margin-bottom: 24px;
        }
        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#F4EDE8')};
            }
        }
    }

    a {
        background: #fff;
        font-size: 14px;
        font-weight: bold;
        height: 47px;
        border-radius: 7px;
        border: 0;
        padding: 0 12px;
        color: #282828;
        width: 100%;
        max-width: 270px;
        margin-top: 14px;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        &:hover {
            background: ${shade(0.2, '#fff')};
            cursor: pointer;
        }
    }
    h4 {
        margin-top: 20px;
    }
    #bar {
        width: 100%;
        max-width: 270px;
        background: #444;
        height: 2px;
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${pageLoginBackground}) no-repeat center;
    background-size: cover;
`;
