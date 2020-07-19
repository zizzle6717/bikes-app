import fs from 'fs';
import path from 'path';
import { CACHE_DIR, cacheTypes } from '../constants/cacheDetails';

// Non-blocking
export default (req, response, type: cacheTypes, key: string) => {
  const { requestId } = req.headers['x-requestid'];
  if (!fs.existsSync(CACHE_DIR)) { fs.mkdirSync(CACHE_DIR); }
  if (!fs.existsSync(path.join(CACHE_DIR, type))) { fs.mkdirSync(path.join(CACHE_DIR, type)); }

  fs.writeFile(path.join(CACHE_DIR, type, `${key}.json`), JSON.stringify(response), err => {
    if (err) {
      console.error(`Failed to cache data! RequestId: ${requestId}`);
      console.error(err.stack);
    }
  });
};
