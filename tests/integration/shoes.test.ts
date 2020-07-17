import { assert, expect, should } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../src/app';

const baseUrl = '/v1';
should();

describe('Routes', () => {
  let server;
  let request;

  const teardown = () => {
    return;
  };

  before(async () => {
    await teardown();

    server = app.listen();
    request = supertest.agent(server);
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
});
