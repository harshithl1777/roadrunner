import React from 'react';
import axios from 'axios';

const PageNotFound = () => {

    const sendRequest = async () => {
        const response = await axios.post('/api/auth/login', {
            email: 'test@gmail.com',
            password: 'roadrunner'
        });
        console.log(response);
    }

    return (
        <div>
            <button onClick={sendRequest}>Send Request</button>
        </div>
    );
}

export default PageNotFound;