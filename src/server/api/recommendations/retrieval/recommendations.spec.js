/**
 * @jest-environment node
 */

const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const getRecommendations = require('./recommendations');
const { InvalidCookieError } = require('./errors');

jest.mock('node-fetch', () => jest.fn().mockImplementation(mockFetchForTestHTMLs));
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

  describe('result', () => {
    let recommendations;
    beforeEach(async () => {
      recommendations = await getRecommendations(5, 'valid-cookie');
    });

    it('is limited to requested amount even when more were retrieved from imdb', () => {
      expect(fetch.mock.calls.length).toBe(3);
      expect(recommendations.length).toBe(5);
    });

    it('contains ids', () => {
      const ids = recommendations.map(({ id }) => id);

      expect(ids).toEqual(['tt4779682', 'tt0119567', 'tt0120338', 'tt1194173', 'tt0337978']);
    });

    it('contains titles', () => {
      const titles = recommendations.map(({ title }) => title);

      expect(titles).toEqual([
        'The Meg',
        'The Lost World: Jurassic Park',
        'Titanic',
        'The Bourne Legacy',
        'Die Hard 4.0',
      ]);
    });

    it('contains poster urls', () => {
      const posterURLs = recommendations.map(({ posterURL }) => posterURL);

      expect(posterURLs).toEqual([
        'https://m.media-amazon.com/images/M/MV5BMjg0MzA4MDE0N15BMl5BanBnXkFtZTgwMzk3MzAwNjM@._V1_UY113_CR0,0,76,113_AL_.jpg',
        'https://m.media-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_UY113_CR0,0,76,113_AL_.jpg',
        'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX76_CR0,0,76,113_AL_.jpg',
        'https://m.media-amazon.com/images/M/MV5BMTc4Njk3MDM1Nl5BMl5BanBnXkFtZTcwODgyOTMxOA@@._V1_UX76_CR0,0,76,113_AL_.jpg',
        'https://m.media-amazon.com/images/M/MV5BNDQxMDE1OTg4NV5BMl5BanBnXkFtZTcwMTMzOTQzMw@@._V1_UY113_CR0,0,76,113_AL_.jpg',
      ]);
    });
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

function mockFetchForTestHTMLs(url, options) {
  const mockResponses = [mockResponseForPage(0), mockResponseForPage(1), mockResponseForPage(2)];

  return Promise.resolve(
    options.headers.Cookie.includes('invalid')
      ? { status: 400 }
      : {
          text: () => {
            const page = options.body.split('loadMoreCount=').slice(-1)[0];
            return mockResponses[page];
          },
        },
  );
}

function mockResponseForPage(page) {
  return fs.readFileSync(path.join(__dirname, 'test', `${page}.html`));
}
