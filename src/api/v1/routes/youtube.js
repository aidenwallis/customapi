import express from 'express';
import * as controller from '../controllers/youtube';

const router = express.Router();

router.get('/latest/:name', controller.latest);

export default router;
