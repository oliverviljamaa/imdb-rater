const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const { API_URL, MAX_AMOUNT, MAX_AMOUNT_PER_REQUEST } = require('./constants');
const { InvalidCookieError } = require('./errors');

module.exports = async function getRecommendations(amount, cookie) {
  const amountToRequest = Math.min(amount, MAX_AMOUNT);

  const indexes = getIndexesForNeededRequests(amountToRequest);
  const promises = indexes.map(index => getRecommendationsForPage(index, cookie));
  const recommendationsByPage = await Promise.all(promises);
  const recommendations = flatten(recommendationsByPage);

  return limitToAmount(recommendations, amountToRequest);
};

function getIndexesForNeededRequests(amount) {
  const numberOfNeededRequests = getNumberOfNeededRequests(amount);
  return getIndexesForNumberOfNeededRequests(numberOfNeededRequests);
}

function getNumberOfNeededRequests(amount) {
  return Math.ceil(amount / MAX_AMOUNT_PER_REQUEST);
}

function getIndexesForNumberOfNeededRequests(numberOfNeededRequests) {
  return Array.from(Array(numberOfNeededRequests).keys());
}

async function getRecommendationsForPage(page, cookie) {
  const html = await getRecommendationsHTMLForPage(page, cookie);
  return getRecommendationsFromHTML(html);
}

async function getRecommendationsHTMLForPage(page, cookie) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: `numItems=${MAX_AMOUNT_PER_REQUEST}&loadMoreCount=${page}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Cookie: cookie,
    },
  });

  if (response.status === 400) {
    throw new InvalidCookieError();
  }

  return response.text();
}

function getRecommendationsFromHTML(html) {
  const {
    window: { document },
  } = new JSDOM(html);

  return Array.from(document.querySelectorAll('.rec_page [data-tconst]')).map(element => {
    const id = element.getAttribute('data-tconst');
    const img = element.querySelector('img');
    const posterURL = img ? img.getAttribute('loadlate') : null;
    const title = img ? img.getAttribute('alt') : null;

    return { id, title, posterURL };
  });
}

function flatten(array) {
  return array.reduce((result, childArray) => [...result, ...childArray], []);
}

function limitToAmount(array, amount) {
  return array.slice(0, amount);
}
