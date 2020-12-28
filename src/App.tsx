import React from 'react';
import { AiOutlineAlert } from 'react-icons/ai';
import Tooltip from './components/Tooltip';
import Global from './styles/global';

const App: React.FC = () => (
    <>
        <Tooltip
            color="#F04738"
            icon={AiOutlineAlert}
            message="Email inválido"
        />
        <Global />
    </>
);

export default App;
