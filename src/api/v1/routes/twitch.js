import express from 'express';
import * as controller from '../controllers/twitch';

const router = express.Router();

router.get('/channel/:channel/uptime', controller.uptime);
router.get('/channel/:channel/title', controller.title);
router.get('/channel/:channel/game', controller.game);

router.get('/toID/:name', controller.toID);
router.get('/toName/:id', controller.toName);
router.get('/botStatus/:name', controller.botStatus);

export default router;
