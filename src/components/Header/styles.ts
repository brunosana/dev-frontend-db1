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
    max-width: 1200px !important;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
        text-decoration: none;
        color: #fff;
        margin-right: 22px;
        &:hover {
            color: ${shade(0.2, '#fff')};
        }
    }

    #dropbtn {
        background-color: transparent;
        text-decoration: none;
        color: #fff;
        padding: 16px;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    #dropdown {
        position: relative;
        display: inline-block;
        background: none;
    }

    #dropdown-content {
        display: none;
        position: absolute;
        color: #fff;
        background-color: #414141;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    #dropdown-content a {
        color: #fff;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    #dropdown-content a:hover {
        background-color: #5f5f5f;
    }

    #dropdown:hover #dropdown-content {
        display: block;
    }

    #dropdown:hover #dropbtn {
        font-weight: bold;
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

    @media screen and (max-width: 915px) {
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
export const LogoutMobile = styled.a`
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
