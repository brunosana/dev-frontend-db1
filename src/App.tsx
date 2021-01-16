import React from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import Tooltip from './components/Tooltip';
import Musics from './pages/Musics';
import EditMusic from './pages/EditMusic';
import Global from './styles/global';

const App: React.FC = () => (
    <>
        <EditMusic />
        <Global />
    </>
);

export default App;
