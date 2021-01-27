import React from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Global from './styles/global';

const App: React.FC = () => (
    <>
        <SignUp />
        <Login />
        <Global />
    </>
);

export default App;
