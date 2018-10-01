const routes = require('express').Router();

const recommendations = require('./recommendations');
const ratings = require('./ratings');

routes.use('/recommendations', recommendations);
routes.use('/ratings', ratings);

module.exports = routes;
