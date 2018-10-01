export default async function rateMovie(id, rating, authKey, cookie) {
  const response = await fetch(`/api/ratings/${id}`, {
    method: 'POST',
    body: JSON.stringify({ rating, authKey, cookie }),
    headers: { 'Content-type': 'application/json' },
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.message);
  }
}
