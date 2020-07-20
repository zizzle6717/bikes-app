import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DATA_DIR, DATA_NAME } from '../constants';
import { cacheTypes } from '../constants/cacheDetails';
import cacheResponse from '../utilities/cacheResponse';
import { findInRange, IFindInRangeArgs } from './helpers/dataSelection';

const tripsCSVFilePath = path.join(DATA_DIR, `${DATA_NAME}.csv`);
const tripsJSONFilePath = path.join(DATA_DIR, `${DATA_NAME}.json`);

const searchTrips = async (req, res) => {
  req.routeName = 'SearchTrips';
  const {
    localEndTimeLow,
    localEndTimeHigh,
    stationEndIds,
    riderAgeRanges,
  } = req.body;
  const {
    order = 'asc',
    orderBy,
  } = req.query;
  const itemsPerPage = Number(req.query.itemsPerPage);
  const pageNumber = Number(req.query.pageNumber);
  let tripsJSONData;

  try {
    // Parse and create JSON file
    if (!fs.existsSync(tripsJSONFilePath)) {
      tripsJSONData = await csv({
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

      fs.writeFile(tripsJSONFilePath, JSON.stringify(tripsJSONData), err => {
        if (err) {
          return res.status(500).send({
            message: 'Failed to create JSON file',
            statusCode: 500,
            error: err.message,
          });
        }
      });
    }

    tripsJSONData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `${DATA_NAME}.json`), { encoding: 'utf8' }));

    const filterArgs: IFindInRangeArgs = {
      data: tripsJSONData,
      order,
      orderBy: orderBy || 'trip_id',
    };
    if (stationEndIds) {
      filterArgs.filters = Object.assign(filterArgs.filters || {}, {
        stationEndIds: stationEndIds.split(','),
      });
    }
    if (localEndTimeLow && localEndTimeHigh) {
      filterArgs.filters = Object.assign(filterArgs.filters || {}, {
        localEndTime: {
          lowerBound: localEndTimeLow,
          upperBound: localEndTimeHigh,
        },
      });
    }
    if (riderAgeRanges) {
      filterArgs.filters = Object.assign(filterArgs.filters || {}, {
        riderAgeRanges: riderAgeRanges.split(','),
      });
    }
    const filteredTrips = findInRange(filterArgs);

    const totalItems = filteredTrips.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let paginatedResults = filteredTrips;

    // Handle Pagination
    if (itemsPerPage && pageNumber) {
      const start = (pageNumber - 1) * itemsPerPage;
      paginatedResults = filteredTrips.slice(start, start + itemsPerPage);
    }

    const response = {
      pagination: {
        itemsPerPage,
        order,
        orderBy,
        pageNumber,
        totalItems,
        totalPages,
      },
      data: paginatedResults,
    };
    const cacheKey = uuidv4();
    cacheResponse(req, response, cacheTypes.TRIPS, cacheKey);

    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: 'Error parsing trips data',
      statusCode: 500,
      error: err.message,
    });
  }
};

export {
  searchTrips,
};
