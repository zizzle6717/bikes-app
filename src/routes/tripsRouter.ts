import express from 'express';
import {
  searchTrips,
} from '../requestHandlers/trips';

const router = express.Router();

router.post('/', searchTrips);

export default router;
