import axios from 'axios';

const getStation = (req, res) => {
  const { stationId } = req.params;

  axios({
    method: 'get',
    url: 'https://gbfs.divvybikes.com/gbfs/en/station_information.json',
  })
    .then(({ data }) => {
      const stations = data && data.data && data.data.stations;
      const foundStation = stations.find(s => s.station_id === stationId);
      if (foundStation) {
        return res.status(200).send({
          routeName: 'getStation',
          pid: process.pid,
          station: foundStation,
        });
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
