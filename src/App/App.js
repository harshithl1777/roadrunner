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
        apiKey: "AIzaSyAw23zRo_wvHfGQ0SR63nUQOwvr3AZQD9E",
        authDomain: "roadrunner-web.firebaseapp.com",
        projectId: "roadrunner-web",
        messagingSenderId: "551216557727",
        appId: "1:551216557727:web:bf6e8c67c668ee2800fcaa",
        measurementId: "G-FEMQK0Y44T"
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