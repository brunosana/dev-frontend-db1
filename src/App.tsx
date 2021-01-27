import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Global from './styles/global';
import { AuthProvider } from './hooks/authContext';
import Routes from './routes';

const App: React.FC = () => (
    <Router>
        <AuthProvider>
            <Routes />
        </AuthProvider>
        <Global />
    </Router>
);

export default App;
