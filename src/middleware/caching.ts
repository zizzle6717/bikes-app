import fs from 'fs';
import path from 'path';
import { CACHE_DIR, cacheTypes } from '../constants/cacheDetails';

export default (req, res, next) => {
  let type = '';
  let key = '';

  if (req.route.path === '/:stationId') {
    type = cacheTypes.STATIONS;
    key = req.params.stationId;
  } else {
    type = cacheTypes.TRIPS;
    // TODO: Generate a key based on request search params
    // key =
  }

  const isCached = fs.existsSync(path.join(CACHE_DIR, type, `${key}.json`));
  const cache = isCached && fs.readFileSync(path.join(CACHE_DIR, type, `${key}.json`), { encoding: 'utf8' });

  if (isCached) {
    return res.status(200).send(JSON.parse(cache));
  }

  return next();
};
