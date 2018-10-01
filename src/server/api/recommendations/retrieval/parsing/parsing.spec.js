const fs = require('fs');
const path = require('path');

const parse = require('./parsing');

const html = fs.readFileSync(path.join(__dirname, 'test', `response.html`));

describe('Parsing', () => {
  let result;
  beforeEach(() => {
    result = parse(html);
  });

  it('gets ids', () => {
    const ids = result.map(({ id }) => id);

    expect(ids).toEqual(expectedIds());
  });

  it('gets titles', () => {
    const titles = result.map(({ title }) => title);

    expect(titles).toEqual(expectedTitles());
  });

  it('gets poster URLs', () => {
    const posterURLs = result.map(({ posterURL }) => posterURL);

    expect(posterURLs).toEqual(expectedPosterURLs());
  });

  it('gets auth keys', () => {
    const authKeys = result.map(({ authKey }) => authKey);

    expect(authKeys).toEqual(expectedAuthKeys());
  });

  function expectedIds() {
    return [
      'tt0499549',
      'tt0076759',
      'tt1504320',
      'tt1748122',
      'tt0105236',
      'tt0374223',
      'tt0110413',
      'tt0133093',
      'tt0103064',
      'tt1606378',
      'tt0075314',
      'tt0078788',
      'tt3385516',
      'tt0371746',
      'tt3199006',
      'tt1228705',
      'tt5095030',
      'tt0163025',
      'tt5463162',
      'tt0887912',
      'tt1431045',
      'tt5013056',
      'tt0118715',
      'tt4779682',
    ];
  }

  function expectedTitles() {
    return [
      'Avatar',
      'Star Wars: Episode IV - A New Hope',
      "The King's Speech",
      'Moonrise Kingdom',
      'Reservoir Dogs',
      'Siin me oleme!',
      'Leon',
      'The Matrix',
      'Terminator 2: Judgment Day',
      'A Good Day to Die Hard',
      'Taxi Driver',
      'Apocalypse Now',
      'X-Men: Apocalypse',
      'Iron Man',
      'Must alpinist',
      'Iron Man 2',
      'Ant-Man and the Wasp',
      'Jurassic Park III',
      'Deadpool 2',
      'The Hurt Locker',
      'Deadpool',
      'Dunkirk',
      'The Big Lebowski',
      'The Meg',
    ];
  }

  function expectedPosterURLs() {
    return [
      'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMzU5MjEwMTg2Nl5BMl5BanBnXkFtZTcwNzM3MTYxNA@@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTEwMTc3NDkzOTJeQTJeQWpwZ15BbWU3MDI4NTAwNzc@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BZmExNmEwYWItYmQzOS00YjA5LTk2MjktZjEyZDE1Y2QxNjA1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BYjcyNjM2MzgtMjU2My00YjY2LWI4YjEtZmE1MGRjODkwM2I4XkEyXkFqcGdeQXVyNzM0MDQ1Mw@@._V1_UY113_CR2,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BZDAwYTlhMDEtNTg0OS00NDY2LWJjOWItNWY3YTZkM2UxYzUzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UY113_CR2,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTcwNzgyNzUzOV5BMl5BanBnXkFtZTcwMzAwOTA5OA@@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BZTNkZmU0ZWQtZjQzMy00YTNmLWFmN2MtZGNkMmU1OThmMGYwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMjU1ODM1MzYxN15BMl5BanBnXkFtZTgwOTA4NDE2ODE@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNjYxZjNkNzItMWRhOS00N2Q1LWEwMDgtMWM0ODAwNDM1OWYwXkEyXkFqcGdeQXVyNDQxNjI4NTA@._V1_UY113_CR2,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BZDMyZGJjOGItYjJkZC00MDVlLWE0Y2YtZGIwMDExYWE3MGQ3XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNjk1Njk3YjctMmMyYS00Y2I4LThhMzktN2U0MTMyZTFlYWQ5XkEyXkFqcGdeQXVyODM2ODEzMDA@._V1_UY113_CR18,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzEwNzQ1NjczM15BMl5BanBnXkFtZTcwNTk3MTE1Mg@@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BN2YyZjQ0NTEtNzU5MS00NGZkLTg0MTEtYzJmMWY3MWRhZjM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UY113_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BZTFjMjBiYzItNzU5YS00MjdiLWJkOTktNDQ3MTE3ZjY2YTY5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_UX76_CR0,0,76,113_AL_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMjg0MzA4MDE0N15BMl5BanBnXkFtZTgwMzk3MzAwNjM@._V1_UY113_CR0,0,76,113_AL_.jpg',
    ];
  }

  function expectedAuthKeys() {
    return [
      'authKey for tt0499549',
      'authKey for tt0076759',
      'authKey for tt1504320',
      'authKey for tt1748122',
      'authKey for tt0105236',
      'authKey for tt0374223',
      'authKey for tt0110413',
      'authKey for tt0133093',
      'authKey for tt0103064',
      'authKey for tt1606378',
      'authKey for tt0075314',
      'authKey for tt0078788',
      'authKey for tt3385516',
      'authKey for tt0371746',
      'authKey for tt3199006',
      'authKey for tt1228705',
      'authKey for tt5095030',
      'authKey for tt0163025',
      'authKey for tt5463162',
      'authKey for tt0887912',
      'authKey for tt1431045',
      'authKey for tt5013056',
      'authKey for tt0118715',
      'authKey for tt4779682',
    ];
  }
});
