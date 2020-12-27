import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0ch;
        font-family: 'Roboto', sans-serif;
    }

    body {
        background: #282828;
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }
    input, button, a {

    }
`;
