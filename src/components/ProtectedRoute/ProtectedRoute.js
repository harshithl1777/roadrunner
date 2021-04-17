import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = () => {
        // Contact server to check if user is logged in
        localStorage.setItem('roadrunner')
    }

    return (
        <Route {...rest} render={(props) => ()} />
    );
}

export default ProtectedRoute;