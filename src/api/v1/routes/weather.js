import express from 'express';
import * as controller from '../controllers/weather';

const router = express.Router();

router.get('/yahoo/:query', controller.yahoo);

export default router;
