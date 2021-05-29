const Sentry = require("@sentry/node");

Sentry.init({
    dsn: process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : null,
    tracesSampleRate: 0.5,
});

