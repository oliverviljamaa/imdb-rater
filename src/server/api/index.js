const routes = require('express').Router();

const recommendations = require('./recommendations');

routes.use('/recommendations', recommendations);

module.exports = routes;
