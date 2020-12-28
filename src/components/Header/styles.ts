import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface showSideBar {
    showSideBar: boolean;
}

export const Container = styled.div<showSideBar>`
    width: 100vw;
    align-items: center;
    justify-content: center;
    height: 60px;
    background: #000;
    display: flex;

    #sideBar {
        height: 100vh;
        width: 45vw;
        top: 0;
        left: 0;
        display: none;
        position: absolute;
        z-index: 1;
        ${props =>
            props.showSideBar &&
            css`
                display: flex;
                flex-direction: column;
                background: #000;
                > a {
                    margin-top: 50px;
                    font-size: 25px;
                    margin-left: 8px;
                    text-decoration: none;
                    color: #fff;
                    & + a {
                        margin-top: 8px;
                    }
                    &:hover {
                        ${shade(0.2, '#fff')};
                    }
                }
            `}
    }
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

    #navVertical {
        display: none;
        border: none;
        background: none;
        position: absolute;
        z-index: 2;
        color: #fff;
        margin-left: 5px;
        &:hover {
            color: ${shade(0.2, '#fff')};
            cursor: pointer;
        }
    }

    @media screen and (max-width: 810px) {
        #navHorizontal {
            display: none;
        }
        #navVertical {
            display: flex;
        }
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
    @media screen and (max-width: 810px) {
        & {
            margin-left: 60px;
            margin-right: 30px;
            input {
                font-weight: normal;
                font-size: 13px;
            }
        }
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

    @media screen and (max-width: 850px) {
        #logoutText {
            display: none;
        }
        svg {
            margin: 0;
            margin-left: 5px;
        }
    }
    @media screen and (max-width: 720px) {
        & {
            display: none;
        }
    }
`;
