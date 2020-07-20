import path from 'path';

const DATA_DIR = path.join(__dirname, '../../src/data');
const DATA_NAME = 'Divvy_Trips_2019_Q2';
const stationsUrl = 'https://gbfs.divvybikes.com/gbfs/en/station_information.json';

export {
  DATA_DIR,
  DATA_NAME,
  stationsUrl,
};
