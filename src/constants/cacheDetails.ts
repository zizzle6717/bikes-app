import path from 'path';

const CACHE_DIR = path.join(__dirname, '../../cache');
const CACHE_KEY_MAP_FILENAME = 'cacheKeyMap.json';

enum cacheTypes {
  STATIONS = 'stations',
  TRIPS = 'trips'
}

export {
  cacheTypes,
  CACHE_DIR,
  CACHE_KEY_MAP_FILENAME,
};
