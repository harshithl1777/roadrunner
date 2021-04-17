import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ActiveWebhooks from './pages/ActiveWebhooks';
import Landing from './pages/Landing';
import PageNotFound from './pages/PageNotFound';
import RequestAccess from './pages/RequestAccess';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/access' component={RequestAccess} />
                <Route path='*' component={PageNotFound} />
                <ProtectedRoute path='/app/webhooks' component={ActiveWebhooks} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;