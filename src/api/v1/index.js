import express from 'express';

import responsesMiddleware from './middlewares/responses';
import router from './router';

const app = express();

app.use(responsesMiddleware);

app.use('/', router);

export default app;
