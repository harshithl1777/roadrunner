import React from 'react';
import axios from 'axios';

const PageNotFound = () => {

    const sendRequest = async () => {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'test@gmail.com',
            password: 'roadrunner'
        });
        console.log(response);
        alert(document.cookie.indexOf('refreshtoken') !== -1);
    }

    return (
        <div>
            Error 404 - Resource does not exist - Cannot GET specified path
            <button onClick={sendRequest}>Send Request</button>
        </div>
    );
}

export default PageNotFound;