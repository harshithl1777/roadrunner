import React, { useState } from 'react';
import { authenticateUser } from '../../services/api/auth';

import logo from './assets/logo.svg';
import './login.css';

const Login = () => {
    const [username, changeUsername] = useState('');
    const[password, changePassword] = useState('');

    const loginClicked = () => {
        authenticateUser(username, password)
        .then((res) =>  {
            if (res) {
                window.localStorage.setItem('roadrunnerUserIsAuthenticated', true);
                window.location.href='/app/webhooks';
            }
        })
        .catch(() => alert('Invalid password or this account does not exist. Please check your details and try again.'));
    }

    return (
        <div className='login'>
            <img className='login-logo' src={logo} alt='logo' />
            <div className='login-modal'>
                <h1 className='login-header'>Log in to Roadrunner</h1>
                <h3 className='login-desc'>Welcome back to Roadrunner! Just enter in your details, click continue, and we’ll let you back in.</h3>
                <input className='login-username' value={username} onChange={(e) => changeUsername(e.target.value)} placeholder='Username' type='text' />
                <input className='login-password' value={password} onChange={(e) => changePassword(e.target.value)} placeholder='Password' type='password'  />
                <button onClick={loginClicked} className='login-continue'>Continue to your account</button>
            </div>

        </div>
    );
}

export default Login;