import express from 'express';
import {
  searchTrips,
} from '../requestHandlers/trips';

const router = express.Router();

router.get('/', searchTrips);

export default router;
