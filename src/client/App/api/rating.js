export default function rateMovie(id, rating) {
  // TODO: Actually rate movies
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
      console.log(`Rated movie ${id}: ${rating}`);
    }, 1000);
  });
}
