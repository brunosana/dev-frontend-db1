import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0ch;
    }

    body {
        background: #282828;
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }
    body, input, button {
        font-family: ''
    }
`;
