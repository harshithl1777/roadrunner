import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const GatewayRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={(props) => (
            (window.localStorage.getItem('roadrunnerUserIsAuthenticated')) ? <Redirect to='/app/webhooks' /> : <Component {...props} />
        )} />
    );
}

export default GatewayRoute;