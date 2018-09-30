export default async function getMovies(amount, cookie) {
  const response = await fetch(`/api/recommendations?amount=${amount}&cookie=${encodeURI(cookie)}`);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
}
