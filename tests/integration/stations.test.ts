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

      expect(response.body.station.station_id).to.be.equal('2');
    });
  });
});
