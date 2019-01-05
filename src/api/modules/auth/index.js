import express from 'express';
import connectRedis from 'connect-redis';
import session from 'express-session';

import config from '../../../../config.json';
import * as redis from '../../../redis';

import router from './router';

const app = express();
const RedisStore = connectRedis(session);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.sessionSecret,
    store: new RedisStore(redis.client),
}));

app.use(router);

export default app;
