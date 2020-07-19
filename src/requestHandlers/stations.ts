import axios from 'axios';
import * as constants from '../constants';
import { cacheTypes } from '../constants/cacheDetails';
import cacheResponse from '../utilities/cacheResponse';

const getStation = (req, res) => {
  req.routeName = 'GetStation';

  const { stationId } = req.params;

  axios({
    method: 'get',
    url: constants.stationsUrl,
  })
    .then(({ data }) => {
      const stations = data && data.data && data.data.stations;
      const foundStation = stations.find(s => s.station_id === stationId);

      if (foundStation) {
        cacheResponse(req, foundStation, cacheTypes.STATIONS, stationId);
        return res.status(200).send(foundStation);
      }

      return res.status(404).send({
        id: 'StationNotFound',
        message: `No station found with the following ID: ${stationId}`,
        statusCode: 404,
      });
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message,
        statusCode: 500,
      });
    });
};

export {
  getStation,
};
