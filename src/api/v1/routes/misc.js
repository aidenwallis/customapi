import express from 'express';
import * as controller from '../controllers/misc';

const router = express.Router();

router.get('/8ball', controller.eightball);
router.get('/coinflip', controller.coinflip);
router.get('/weather/:query', controller.weather);

export default router;
