const fetch = require('node-fetch');

module.exports = function rateMovie(id, rating, auth, cookie) {
  return fetch('https://www.imdb.com/ratings/_ajax/title', {
    method: 'POST',
    body: `tconst=${id}&rating=${rating}&auth=${auth}&tracking_tag=p13nsims-title`,
    headers: {
      Cookie: cookie,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
