const fetch = require('node-fetch');

const rateMovie = require('./ratings');

jest.mock('node-fetch', () => jest.fn(() => ({ some: 'result' })));

describe('Ratings', () => {
  it('calls imdb with movie id, rating, and auth in body and cookie in headers and returns result', async () => {
    expect(fetch).not.toBeCalled();
    const result = await rateMovie('tt1234567', 5, 'authKey', 'a-cookie');
    expect(fetch).toBeCalledWith('https://www.imdb.com/ratings/_ajax/title', {
      method: 'POST',
      body: 'tconst=tt1234567&rating=5&auth=authKey&tracking_tag=p13nsims-title',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: 'a-cookie' },
    });
    expect(result).toEqual({ some: 'result' });
  });
});
