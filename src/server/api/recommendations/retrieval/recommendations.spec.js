/**
 * @jest-environment node
 */

const fetch = require('node-fetch');

const parseHTMLForRecommendations = require('./parsing');
const getRecommendations = require('./recommendations');
const { InvalidCookieError } = require('./errors');

jest.mock('node-fetch', () =>
  jest.fn((url, options) =>
    Promise.resolve(
      options.headers.Cookie.includes('invalid') ? { status: 400 } : { text: () => '' },
    ),
  ),
);
jest.mock('./parsing', () => jest.fn(() => [{}, {}]));
jest.mock('./constants', () => ({
  API_URL: 'https://www.imdb.com/recommendations/user_recs/_ajax',
  MAX_AMOUNT_PER_REQUEST: 2,
  MAX_AMOUNT: 7,
}));

describe('Recommendations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls imdb with max amount per request, incrementing pages, and cookie enough times to get the requested amount', async () => {
    expect(fetch).not.toBeCalled();
    await getRecommendations(5, 'valid-cookie');
    expect(fetch.mock.calls).toEqual([
      aCallForAmountAndPageAndCookie(2, 0, 'valid-cookie'),
      aCallForAmountAndPageAndCookie(2, 1, 'valid-cookie'),
      aCallForAmountAndPageAndCookie(2, 2, 'valid-cookie'),
    ]);
  });

  it('calls imdb with max amount when requested amount is bigger than max amount', async () => {
    expect(fetch).not.toBeCalled();
    await getRecommendations(999, 'valid-cookie');
    expect(fetch.mock.calls).toEqual([
      aCallForAmountAndPageAndCookie(2, 0, 'valid-cookie'),
      aCallForAmountAndPageAndCookie(2, 1, 'valid-cookie'),
      aCallForAmountAndPageAndCookie(2, 2, 'valid-cookie'),
      aCallForAmountAndPageAndCookie(2, 3, 'valid-cookie'),
    ]);
  });

  it('throws invalid cookie error when imdb response status is 400', async () => {
    expect.assertions(1);
    try {
      await getRecommendations(5, 'invalid-cookie');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCookieError);
    }
  });

  it('parses html for recommendations', async () => {
    expect(parseHTMLForRecommendations).not.toBeCalled();
    await getRecommendations(5, 'valid-cookie');
    expect(parseHTMLForRecommendations).toBeCalledTimes(3);
  });

  it('limits recommendations amount to requested amount even when more were retrieved from imdb', async () => {
    const recommendations = await getRecommendations(5, 'valid-cookie');

    expect(fetch.mock.calls.length).toBe(3);
    expect(recommendations.length).toBe(5);
  });

  function aCallForAmountAndPageAndCookie(amount, page, cookie) {
    return [
      'https://www.imdb.com/recommendations/user_recs/_ajax',
      {
        body: `numItems=${amount}&loadMoreCount=${page}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Cookie: cookie,
        },
        method: 'POST',
      },
    ];
  }
});
