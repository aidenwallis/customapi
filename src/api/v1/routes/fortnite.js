import express from 'express';
import * as controller from '../controllers/fortnite';
import fortnitePlatformsMiddleware from '../middlewares/fortnite-platforms';

const router = express.Router();

router.get('/stats/wins_today/:platform/:username', fortnitePlatformsMiddleware, controller.winsToday);
router.get('/stats/wins_total/:platform/:username', fortnitePlatformsMiddleware, controller.winsTotal);
router.get('/stats/:statName/:platform/:username', fortnitePlatformsMiddleware, controller.statsFromProfile);

export default router;
