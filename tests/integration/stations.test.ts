import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../dist/app';

const baseUrl = '/v1';

describe('Routes', () => {
  let server;
  let request;

  const teardown = () => {
    // Teardown mock data from local database
  };

  before(async () => {
    await teardown();

    server = app.listen();
    request = supertest.agent(server, {});
  });

  after(async () => {
    server.close();
    await teardown();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /_healthz', () => {
    it('should have a health check endpoint', async () => {
      await request
        .get('/_healthz')
        .expect(200);
    });
  });

  describe('GET /v1/stations/:stationId', () => {
    it('should require authorization header', async () => {
      const response = await request
        .get(`${baseUrl}/stations/1`)
        .expect(401);

      expect(response.body.message).to.be.equal('Invalid authorization header provided');
    });

    it('should return 404 if not found', async () => {
      const response = await request
        .get(`${baseUrl}/stations/1`)
        .set('authorization', `Bearer ${process.env.MOCK_JWT}`)
        .expect(404);

      expect(response.body.id).to.be.equal('StationNotFound');
    });

    it('should return 200 with valid station when found', async () => {
      const response = await request
        .get(`${baseUrl}/stations/2`)
        .set('authorization', `Bearer ${process.env.MOCK_JWT}`)
        .expect(200);

      expect(response.body.station_id).to.be.equal('2');
    });
  });

  describe('POST /v1/trips', () => {
    it('should require authorization header', async () => {
      const response = await request
        .post(`${baseUrl}/trips`, {})
        .expect(401);

      expect(response.body.message).to.be.equal('Invalid authorization header provided');
    });

    it('should return 200 paginated list of results', async () => {
      const response = await request
        .post(`${baseUrl}/trips?itemsPerPage=20&pageNumber=1&order=asc&orderBy=local_end_time`, {
          localEndTimeLow: '2019-04-01 00:00:00',
          localEndTimeHigh: '2019-04-01 01:00:00',
          stationEndIds: '',
          riderAgeRanges: '20-60',
        })
        .set('authorization', `Bearer ${process.env.MOCK_JWT}`)
        .expect(200);

      expect(response.body.pagination).to.be.deep.equal({
        itemsPerPage: 20,
        order: 'asc',
        orderBy: 'local_end_time',
        pageNumber: 1,
        totalItems: 1108163,
        totalPages: 55409,
      });
      expect(response.body.data.length).to.be.equal(20);
    }).timeout(5000);
  });
});
