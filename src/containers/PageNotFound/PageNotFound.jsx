import React, { useState } from 'react';
import axios from 'axios';

const PageNotFound = () => {
    const [token, setToken] = useState('');

    const sendRequest = async () => {
        const { data } = await axios.post('/api/auth/login', {
            email: 'test@gmail.com',
            password: 'roadrunner',
        });
        setToken(data.accessToken);
    };

    const refreshAccess = async () => {
        const { data } = await axios.post('/api/auth/refresh');
        setToken(data.accessToken);
    };

    const deleteRefresh = async () => {
        await axios.delete('/api/auth/logout', { withCredentials: true });
        setToken('');
    };

    return (
        <div>
            <button onClick={sendRequest}>Login</button>
            <button onClick={refreshAccess}>Refresh</button>
            <button onClick={deleteRefresh}>Logout</button>
            <h3>{token}</h3>
        </div>
    );
};

export default PageNotFound;
