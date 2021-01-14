import React from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import Tooltip from './components/Tooltip';
import Musics from './pages/Musics';
import Global from './styles/global';

const App: React.FC = () => (
    <>
        <Musics />
        <Global />
    </>
);

export default App;
