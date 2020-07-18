import express from 'express';
import {
  getStation,
} from '../requestHandlers/stations';

const router = express.Router();

router.get('/:stationId', getStation);

export default router;
