const recommendations = require('express').Router();

const getRecommendations = require('./retrieval/recommendations');

recommendations.get('/', async (req, res, next) => {
  const {
    query: { amount, cookie },
  } = req;

  try {
    const retrievedRecommendations = await getRecommendations(amount, cookie);
    res.json(retrievedRecommendations);
  } catch (error) {
    res.status(error.status).json(error);
    next(error);
  }
});

module.exports = recommendations;
