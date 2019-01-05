import express from 'express';
import * as controller from '../controllers/twitch';

const router = express.Router();

router.get('/redirect', controller.redirect);
router.get('/callback', controller.callback);

export default router;
