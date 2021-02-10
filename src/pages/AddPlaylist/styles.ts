import styled from 'styled-components';
import Microphone from '../../assets/microphone.jpg';

export const Container = styled.div`
    height: calc(100vh - 60px);
    flex: 2;
    align-items: center;
    justify-content: center;
`;

export const FormArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-top: 15%;
    div {
        margin-bottom: 35px;
        font-size: 25px;
        font-weight: bold;
    }
    form {
        width: 40vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        div {
            margin: 8px 0;
        }
        button {
            width: 90%;
            margin: 8px 10%;
        }
    }
`;

export const Content = styled.div`
    height: calc(100vh - 60px);
    display: flex;
    align-items: stretch;
`;

export const Background = styled.div`
    flex: 1.3;
    background: url(${Microphone}) no-repeat center;
    background-size: cover;
`;
