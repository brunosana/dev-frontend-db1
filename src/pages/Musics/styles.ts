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

export const MusicList = styled.div`
    width: 100%;
    max-width: 1200px;
    margin-left: 20px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
`;

export const MusicListTitle = styled.div`
    display: flex;
    font-weight: bold;
    margin-bottom: 3px;
    border-bottom: 2px solid #444444;
    width: 100%;
    #id {
        width: 9vw;
    }

    #name {
        width: 60vw;
    }

    #duration {
        width: 8vw;
    }
    & + a {
        margin-left: 10px;
    }

    @media screen and (max-width: 820px) {
        #duration {
            width: 12vw;
        }
    }
    @media screen and (max-width: 790px) {
        #duration {
            width: 8vw;
        }
        #name {
            width: 55vw;
        }
    }
    @media screen and (max-width: 600px) {
        #id {
            width: 16vw;
        }
    }
    @media screen and (max-width: 400px) {
        #name {
            width: 48vw;
        }
        #duration {
            width: 12vw;
        }
    }
`;

export const Music = styled.div`
    display: flex;
    height: 25px;
    text-decoration: none;
    margin-top: 7px;

    #musicID {
        width: 9vw;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    #musicName {
        width: 60vw;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    #musicDuration {
        width: 4vw;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    a {
        margin-left: 10px;
        text-decoration: none;
        color: #fff;
        &:hover {
            color: #f56b31;
        }
    }

    @media screen and (max-width: 790px) {
        #musicDuration {
            width: 8vw;
        }
        #musicName {
            width: 55vw;
        }
    }
    @media screen and (max-width: 600px) {
        #musicID {
            width: 16vw;
        }
    }
    @media screen and (max-width: 400px) {
        #musicName {
            width: 48vw;
        }
        #musicDuration {
            width: 12vw;
        }
    }
`;
