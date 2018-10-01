const { JSDOM } = require('jsdom');

module.exports = function parse(html) {
  const {
    window: { document },
  } = new JSDOM(html);

  const recommendations = getRecommendationsFromDocument(document);
  const recommendationsWithAuthKeys = addAuthKeysToRecommendationsFromDocument(
    recommendations,
    document,
  );

  return recommendationsWithAuthKeys;
};

function getRecommendationsFromDocument(document) {
  const recommendationElements = document.querySelectorAll('.rec_page [data-tconst]');
  return Array.from(recommendationElements).map(getRecommendationFromElement);
}

function getRecommendationFromElement(element) {
  const id = element.getAttribute('data-tconst');
  const img = element.querySelector('img');
  const posterURL = img ? img.getAttribute('loadlate') : null;
  const title = img ? img.getAttribute('alt') : null;

  return { id, title, posterURL };
}

function addAuthKeysToRecommendationsFromDocument(recommendations, document) {
  return recommendations.map(recommendation => ({
    ...recommendation,
    authKey: getAuthKeyFromDocumentForId(document, recommendation.id),
  }));
}

function getAuthKeyFromDocumentForId(document, id) {
  return document
    .querySelector(`.rec_overview[data-tconst="${id}"] .rating`)
    .getAttribute('data-auth');
}
