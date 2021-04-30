import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import firebase from "firebase/app";

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import GatewayRoute from '../components/GatewayRoute/GatewayRoute';
import ActiveWebhooks from '../containers/ActiveWebhooks/ActiveWebhooks';
import PageNotFound from '../containers/PageNotFound/PageNotFound';
import Login from '../containers/Login/Login';
import Sidebar from '../components/Sidebar/Sidebar';

const App = () => {
    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT
    };
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={() => <Redirect to='/login'/>} />
                <GatewayRoute exact path='/login' component={Login} />
                <Route path='/app'>
                    <Sidebar />
                    <Route exact path='/app' component={() => <Redirect to='/app/webhooks'/>} />
                    <ProtectedRoute exact path='/app/webhooks' component={ActiveWebhooks} />
                </Route>
                <Route path='*' component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;