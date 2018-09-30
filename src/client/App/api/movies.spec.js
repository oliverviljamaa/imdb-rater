import getMovies from './movies';

describe('Movies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls recommendations api with amount and uri-encoded cookie', async () => {
    mockPositiveResponseWithData([]);

    expect(fetch).not.toBeCalled();
    await getMovies(5, 'a-cookie');
    expect(fetch).toBeCalledWith('/api/recommendations?amount=5&cookie=a-cookie');
  });

  it('returns movies when response from recommendations api is ok', async () => {
    mockPositiveResponseWithData([{ id: '1' }, { id: '2' }]);

    const movies = await getMovies(5, 'a-cookie');

    expect(movies).toEqual([{ id: '1' }, { id: '2' }]);
  });

  it('throws error with message from error when response from recommendations api is not ok', async () => {
    mockNegativeResponseWithMessage('I am nut ok');

    expect.assertions(1);
    try {
      await getMovies(5, 'a-cookie');
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
