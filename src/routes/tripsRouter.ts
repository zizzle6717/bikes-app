import express from 'express';
import {
  searchTrips,
} from '../requestHandlers/trips';
import caching from '../middleware/caching';

const router = express.Router();

router.post('/', caching, searchTrips);

export default router;
