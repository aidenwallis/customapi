import express from 'express';
import logger from './util/logger';

import apiVersion1 from './api/v1';
import authModule from './api/modules/auth';

const app = express();

app.use('/api/v1', apiVersion1);
app.use('/api/modules/auth', authModule);

const port = process.env.PORT || 8881;
const server = app.listen(port, () => {
    logger.info(`Express listening on port ${port}`);
});

export default server;
