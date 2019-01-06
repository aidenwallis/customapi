import express from 'express';
import * as controller from '../controllers/emotes';

const router = express.Router();

router.get('/:channel/bttv', controller.bttv);
router.get('/:channel/ffz', controller.ffz);
router.get('/:channel/twitch', controller.twitch);

export default router;
