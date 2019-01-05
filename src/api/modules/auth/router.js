import express from 'express';

import twitchRoutes from './routes/twitch';

const router = express.Router();

router.use('/twitch', twitchRoutes);

export default router;
