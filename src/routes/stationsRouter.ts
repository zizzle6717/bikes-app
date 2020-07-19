import express from 'express';
import caching from '../middleware/caching';
import {
  getStation,
} from '../requestHandlers/stations';

const router = express.Router();

router.get('/:stationId', caching, getStation);

export default router;
