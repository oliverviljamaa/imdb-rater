const ratings = require('express').Router();

const rateMovie = require('./dispatch/ratings');

ratings.post('/:id', async (req, res, next) => {
  const {
    params: { id },
    body: { rating, cookie, authKey },
  } = req;

  try {
    await rateMovie(id, rating, authKey, cookie);
    res.status(200).json({ id, rating, authKey, cookie });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error);
  }
});

module.exports = ratings;
