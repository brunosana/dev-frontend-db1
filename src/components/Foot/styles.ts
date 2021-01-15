import styled from 'styled-components';

export const Footer = styled.div`
    width: 100vw;
    display: flex;
    margin-top: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    padding-bottom: 4px;
    background: #282828;
    background: linear-gradient(
        0deg,
        rgba(40, 40, 40, 1) 60%,
        rgba(2, 0, 36, 0) 100%
    );
    div {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        border-top: 2px solid #444444;
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
            font-size: 10px;
        }
    }
`;
