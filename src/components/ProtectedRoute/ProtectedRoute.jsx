import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={(props) => (
            (window.localStorage.getItem('roadrunnerUserIsAuthenticated')) ? <Component {...props} /> : <Redirect to='/login' />
        )} />
    );
}

export default ProtectedRoute;