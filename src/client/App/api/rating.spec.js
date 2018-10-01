import rateMovie from './rating';

describe('Rating', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls ratings api with id, rating, auth key, and cookie', async () => {
    mockPositiveResponseWithData({});

    expect(fetch).not.toBeCalled();
    await rateMovie('tt123567', 5, 'authKey', 'a-cookie');
    expect(fetch).toBeCalledWith('/api/ratings/tt123567', {
      method: 'POST',
      body: JSON.stringify({ rating: 5, authKey: 'authKey', cookie: 'a-cookie' }),
      headers: { 'Content-type': 'application/json' },
    });
  });

  it('throws error with message from error when response from ratings api is not ok', async () => {
    mockNegativeResponseWithMessage('I am nut ok');

    expect.assertions(1);
    try {
      await rateMovie('tt123567', 5, 'authKey', 'a-cookie');
    } catch (err) {
      expect(err).toEqual(Error('I am nut ok'));
    }
  });

  function mockPositiveResponseWithData(data) {
    mockResponseWithOkAndResolvedJSON(true, data);
  }

  function mockNegativeResponseWithMessage(message) {
    mockResponseWithOkAndResolvedJSON(false, { message });
  }

  function mockResponseWithOkAndResolvedJSON(ok, json) {
    fetch.mockReturnValue(Promise.resolve({ ok, json: () => Promise.resolve(json) }));
  }
});
