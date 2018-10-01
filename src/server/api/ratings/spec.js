/**
 * @jest-environment node
 */

const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

const ratings = require('.');
const rateMovie = require('./dispatch/ratings');

jest.mock('./dispatch/ratings');

describe('Ratings API', () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(ratings);
  });

  it('dispatches rating with id and rating and auth key and cookie', async () => {
    expect(rateMovie).not.toBeCalled();
    await request(app)
      .post('/tt1234567')
      .send({ rating: 5, authKey: 'authKey for tt1234567', cookie: 'a-cookie' });
    expect(rateMovie).toBeCalledWith('tt1234567', 5, 'authKey for tt1234567', 'a-cookie');
  });

  it('sends status 200 and rating object on success', async () => {
    await request(app)
      .post('/tt1234567')
      .send({ rating: 5, authKey: 'authKey for tt1234567', cookie: 'a-cookie' })
      .expect(200, {
        id: 'tt1234567',
        rating: 5,
        authKey: 'authKey for tt1234567',
        cookie: 'a-cookie',
      });
  });

  it('sends status 500 and error message on failure', async () => {
    rateMovie.mockImplementation(() => {
      throw new Error('Some error');
    });

    await request(app)
      .post('/tt1234567')
      .send({ bad: 'payload' })
      .expect(500, { message: 'Some error' });
  });
});
