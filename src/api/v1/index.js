import express from 'express';

import * as twitchApiService from './services/twitch-api';
import responsesMiddleware from './middlewares/responses';
import router from './router';

const app = express();

twitchApiService.startHelixToken();

app.use(responsesMiddleware);

app.use('/', router);

export default app;
