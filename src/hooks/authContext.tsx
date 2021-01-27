import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import storageItems from '../utils/getStorageItemNames';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}
interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// eslint-disable-next-line
export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem(storageItems.token);
        const user = localStorage.getItem(storageItems.user);
        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        /*
        const response = await api.post('/api/token', {
            username: 'admin',
            password: 'admin',
        });
        */
        const response = {
            data: {
                user: {
                    name: 'Bruno',
                    email: 'bruno@bruno.com',
                },
                token: '123456',
            },
        };

        const { user, token } = response.data;
        localStorage.setItem(storageItems.token, token);
        localStorage.setItem(storageItems.user, JSON.stringify(user));
        setData({ token, user });
        console.log(response.data);
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem(storageItems.token);
        localStorage.removeItem(storageItems.user);
        setData({} as AuthState);
    }, []);
    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
