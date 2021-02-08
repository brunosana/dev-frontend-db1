import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 35px;
    align-items: center;
    justify-content: center;
`;

export const Image = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Table = styled.table`
    width: 100%;
    max-width: 1200px;
    margin: 4px 15px;
    align-items: center;
    text-align: left;

    #TableHead {
        margin-bottom: 3px;
        border-bottom: 2px solid #444444;
    }

    a {
        margin-left: 10px;
        text-decoration: none;
        color: #fff;
        &:hover {
            color: #f56b31;
        }
    }
    button {
        background: none;
        border: 0;
        margin: 0;
        padding: 0;
        margin-left: 10px;
        text-decoration: none;
        color: #fff;

        &:hover {
            color: #f56b31;
        }
    }
`;
