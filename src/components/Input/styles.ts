import styled from 'styled-components';

export const Container = styled.div`
    background: #282828;
    border-radius: 7px;
    border: 2px solid #fff;
    padding: 12px;
    width: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    input {
        color: #fff;
        flex: 1;
        border: 0;
        background: transparent;
        font-size: 14px;
        &::placeholder {
            color: #ddd;
        }
    }
    svg {
        margin-right: 16px;
    }
    & + div {
        margin-top: 8px;
    }
`;
