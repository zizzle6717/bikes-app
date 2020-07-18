import axios from 'axios';

const getStation = (req, res) => {
  axios({
    method: 'get',
    url: 'https://gbfs.divvybikes.com/gbfs/en/station_information.json',
  })
    .then(response => {
      return res.status(200).send({
        routeName: 'getStation',
        pid: process.pid,
        ...response.data,
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
