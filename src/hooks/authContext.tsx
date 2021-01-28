import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import storageItems from '../utils/getStorageItemNames';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    token: string;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}
interface AuthState {
    token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// eslint-disable-next-line
export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem(storageItems.token);
        if (token) {
            return { token };
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/api/token/', {
            username: email,
            password,
        });

        const { access: token } = response.data;
        localStorage.setItem(storageItems.token, token);
        setData({ token });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem(storageItems.token);
        setData({} as AuthState);
    }, []);
    return (
        <AuthContext.Provider value={{ token: data.token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Auth provider must be used within a AuthProvider');
    }
    return context;
}
