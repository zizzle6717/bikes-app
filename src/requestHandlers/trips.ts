import csv from 'csvtojson';
import path from 'path';

const tripsFilePath = path.join(__dirname, '../data/Divvy_Trips_2019_Q2.csv');

const searchTrips = async (req, res) => {
  try {
    const tripsJSON = await csv().fromFile(tripsFilePath);
    return res.status(200).send({
      routeName: 'searchTrips',
      pid: process.pid,
      trips: tripsJSON,
    });
  } catch {
    return res.status(500).send({
      message: 'Error parsing trips data',
      statusCode: 500,
    });
  }
};

export {
  searchTrips,
};
