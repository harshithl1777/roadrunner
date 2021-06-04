import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App/App';

Sentry.init({
    dsn: process.env.REACT_APP_STATUS === 'production' ? process.env.REACT_APP_SENTRY_DSN : null,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.5,
  });

ReactDOM.render(<App />, document.querySelector('#root'));