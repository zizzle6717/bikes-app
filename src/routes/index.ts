import express from 'express';
import stationsRouter from './stationsRouter';
import tripsRouter from './tripsRouter';

const router = express.Router();

router.use('/stations', stationsRouter);
router.use('/trips', tripsRouter);

export default router;
