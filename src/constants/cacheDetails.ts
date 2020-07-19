import path from 'path';

const CACHE_DIR = path.join(__dirname, '../../cache');

enum cacheTypes {
  STATIONS = 'stations',
  TRIPS = 'trips'
}

export {
  cacheTypes,
  CACHE_DIR,
};
