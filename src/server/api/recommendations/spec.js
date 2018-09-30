/**
 * @jest-environment node
 */

const express = require('express');
const request = require('supertest');

const recommendations = require('.');
const getRecommendations = require('./retrieval/recommendations');

jest.mock('./retrieval/recommendations');

describe('Recommendations API', () => {
  let app;
  beforeEach(() => {
    app = express();
    app.use(recommendations);
  });

  it('retrieves recommendations with amount and cookie', async () => {
    expect(getRecommendations).not.toBeCalled();
    await request(app)
      .get('/')
      .query({ amount: 3, cookie: 'a-cookie' });
    expect(getRecommendations).toBeCalledWith('3', 'a-cookie');
  });

  it('sends recommendations when retrieval is successful', async () => {
    getRecommendations.mockReturnValue([{ id: '1' }, { id: '2' }, { id: '3' }]);

    await request(app)
      .get('/')
      .query({ amount: 3, cookie: 'a-cookie' })
      .expect([{ id: '1' }, { id: '2' }, { id: '3' }]);
  });

  it('sends error with status when retrieval is unsuccessful', async () => {
    class ErrorWithStatus extends Error {
      constructor() {
        super();
        this.name = 'ErrorWithStatus';
        this.message = 'Some error';
        this.status = 418;
      }
    }
    getRecommendations.mockImplementation(() => {
      throw new ErrorWithStatus();
    });

    await request(app)
      .get('/')
      .query({ amount: 3, cookie: 'a-cookie' })
      .expect(418, { name: 'ErrorWithStatus', message: 'Some error', status: 418 });
  });
});
