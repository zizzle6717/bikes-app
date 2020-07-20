import fs from 'fs';
import path from 'path';
import { CACHE_DIR, cacheTypes, CACHE_KEY_MAP_FILENAME } from '../constants/cacheDetails';
import getCacheReqTripVal from './getCacheReqTripVal';

// Non-blocking
export default (req, response, type: cacheTypes, key: string) => {
  return new Promise((resolve, reject) => {
    const requestId = req.headers['x-requestid'];
    if (!fs.existsSync(CACHE_DIR)) { fs.mkdirSync(CACHE_DIR); }
    if (!fs.existsSync(path.join(CACHE_DIR, type))) { fs.mkdirSync(path.join(CACHE_DIR, type)); }

    // Use req query and params for future cache lookup
    if (type === cacheTypes.TRIPS) {
      if (!fs.existsSync(path.join(CACHE_DIR, CACHE_KEY_MAP_FILENAME))) {
        fs.writeFileSync(path.join(CACHE_DIR, CACHE_KEY_MAP_FILENAME), JSON.stringify([]));
      }

      const cacheKeyMap = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, CACHE_KEY_MAP_FILENAME), { encoding: 'utf8' }));
      const val = getCacheReqTripVal(req);
      const foundKeyVal = cacheKeyMap.find(keyVal => keyVal[1] === val);
      if (!foundKeyVal) {
        cacheKeyMap.push([key, val]);
        fs.writeFileSync(path.join(CACHE_DIR, CACHE_KEY_MAP_FILENAME), JSON.stringify(cacheKeyMap, null, 2));
      } else {
        // Use the pre-existing key
        key = foundKeyVal[0]; // eslint-disable-line no-param-reassign
      }
    }

    fs.writeFile(path.join(CACHE_DIR, type, `${key}.json`), JSON.stringify(response), err => {
      if (err) {
        console.error(`Failed to cache data! RequestId: ${requestId}`);
        console.error(err.stack);
        return reject();
      }

      return resolve();
    });
  });
};
