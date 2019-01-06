import express from 'express';

import miscRoutes from './routes/misc';
import emotesRoutes from './routes/emotes';
import twitchRoutes from './routes/twitch';
import youtubeRoutes from './routes/youtube';
import fortniteRoutes from './routes/fortnite';

const router = express.Router();

router.use('/misc', miscRoutes);
router.use('/emotes', emotesRoutes);
router.use('/twitch', twitchRoutes);
router.use('/youtube', youtubeRoutes);
router.use('/fortnite', fortniteRoutes);

export default router;
