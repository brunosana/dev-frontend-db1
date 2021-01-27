import React from 'react';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Global from './styles/global';
import { AuthProvider } from './hooks/authContext';

const App: React.FC = () => (
    <>
        <AuthProvider>
            <Login />
        </AuthProvider>
        <Global />
    </>
);

export default App;
