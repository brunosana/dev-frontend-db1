import React from 'react';
import { AiFillAlert } from 'react-icons/ai';
import Input from './components/Input';

function App() {
    return (
        <>
            <h1>Hello World</h1>
            <Input
                name="email"
                icon={AiFillAlert}
                type="text"
                placeholder="E-mail"
            />
        </>
    );
}

export default App;
