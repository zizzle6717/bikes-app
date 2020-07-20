import fs from 'fs';
import path from 'path';
import { CACHE_DIR, cacheTypes, CACHE_KEY_MAP_FILENAME } from '../constants/cacheDetails';
import getCacheReqTripVal from '../utilities/getCacheReqTripVal';

export default (req, res, next) => {
  let type = '';
  let key = '';

  if (req.baseUrl === '/v1/stations' && req.route.path === '/:stationId') {
    type = cacheTypes.STATIONS;
    key = req.params.stationId;
  } else if (req.baseUrl === '/v1/trips') {
    type = cacheTypes.TRIPS;
    if (!fs.existsSync(path.join(CACHE_DIR, CACHE_KEY_MAP_FILENAME))) {
      fs.writeFileSync(path.join(CACHE_DIR, CACHE_KEY_MAP_FILENAME), JSON.stringify([]));
    }

    const cacheKeyMap = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, CACHE_KEY_MAP_FILENAME), { encoding: 'utf8' }));
    const val = getCacheReqTripVal(req);
    const foundKeyVal = cacheKeyMap.find(keyVal => keyVal[1] === val);
    if (foundKeyVal) {
      key = foundKeyVal[0];
    }
  }

  const isCached = fs.existsSync(path.join(CACHE_DIR, type, `${key}.json`));
  const cache = isCached && fs.readFileSync(path.join(CACHE_DIR, type, `${key}.json`), { encoding: 'utf8' });

  if (isCached) {
    return res.status(200).send(JSON.parse(cache));
  }

  return next();
};
