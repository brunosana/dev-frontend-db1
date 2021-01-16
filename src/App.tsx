import React from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import Tooltip from './components/Tooltip';
import Musics from './pages/Musics';
import AddMusic from './pages/AddMusic';
import Global from './styles/global';

const App: React.FC = () => (
    <>
        <AddMusic />
        <Global />
    </>
);

export default App;
