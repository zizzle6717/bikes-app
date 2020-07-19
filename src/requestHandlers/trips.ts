import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { DATA_DIR, DATA_NAME } from '../constants';

const tripsCSVFilePath = path.join(DATA_DIR, `${DATA_NAME}.csv`);
const tripsJSONFilePath = path.join(DATA_DIR, `${DATA_NAME}.json`);

const searchTrips = async (req, res) => {
  req.routeName = 'SearchTrips';
  const {
    localEndTimeLow,
    localEndTimeHigh,
  } = req.body;
  const {
    filterBy, // TODO
    query,
    order = 'asc', // TODO
    orderBy, // TODO
  } = req.query;
  const itemsPerPage = Number(req.query.itemsPerPage);
  const pageNumber = Number(req.query.pageNumber);

  try {
    if (!fs.existsSync(tripsJSONFilePath)) {
      // Parse and create JSON file
      const tripsJSON = await csv({
        headers: [
          'trip_id',
          'local_start_time',
          'local_end_time',
          'bike_id',
          'trip_duration_secs',
          'station_start_id',
          'station_start_name',
          'station_end_id',
          'station_end_name',
          'rider_type',
          'rider_gender',
          'rider_birth_year',
        ],
      }).fromFile(tripsCSVFilePath);

      fs.writeFile(tripsJSONFilePath, JSON.stringify(tripsJSON), err => {
        if (err) {
          return res.status(500).send({
            message: 'Failed to create JSON file',
            statusCode: 500,
            error: err.message,
          });
        }
      });
    }

    const tripsJSON = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'Divvy_Trips_2019_Q2.json'), { encoding: 'utf8' }));

    const filtered = tripsJSON
      .filter(trip => {
        let valid = true;
        if (localEndTimeLow) {
          valid = new Date(trip.local_end_time) >= new Date(localEndTimeLow);
        }
        if (localEndTimeLow) {
          valid = new Date(trip.local_end_time) < new Date(localEndTimeHigh);
        }
        return valid;
      });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginatedResults = filtered;
    // Handle Pagination
    if (itemsPerPage && pageNumber) {
      const start = (pageNumber - 1) * itemsPerPage;
      paginatedResults = filtered.slice(start, start + itemsPerPage);
    }

    // TODO: Cache
    const response = {
      pagination: {
        filterBy,
        itemsPerPage,
        query,
        order,
        orderBy,
        pageNumber,
        totalItems,
        totalPages,
      },
      data: paginatedResults,
    };
    return res.status(200).send(response);
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
