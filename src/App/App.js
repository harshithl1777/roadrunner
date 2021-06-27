import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import GatewayRoute from '../components/GatewayRoute/GatewayRoute';
import ActiveWebhooks from '../containers/ActiveWebhooks/ActiveWebhooks';
import PageNotFound from '../containers/PageNotFound/PageNotFound';
import Login from '../containers/Login/Login';
import Sidebar from '../components/Sidebar/Sidebar';
import { getTokens, deleteTokens } from '../services/api/oAuth';

const App = () => {

    useEffect(async () => {
        try {
            const tokens = await getTokens('bluestacks-master');
            if (tokens.trellotoken) {
                const { status } = await axios.get(`https://api.trello.com/1/tokens/${tokens.trellotoken}`, {
                    params: {
                        key: process.env.REACT_APP_TRELLO_API_KEY,
                        token: tokens.trellotoken
                    }
                });
                if (status !== 200) deleteTokens('trello');
            }
            if (tokens.gapiaccess) {
                const { status } = await axios.post(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${tokens.access_token}`);
                if (status !== 200) deleteTokens('google');
            }
        } catch(err) {
            alert(err);
        }
    });

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