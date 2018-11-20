import React, { StrictMode, useState, useEffect } from 'react';

import { loadCookie, saveCookie } from './storage/local';
import getMovies from './api/movies';
import rateMovie from './api/rating';

import Header from './Header';
import Main from './Main';

const AMOUNT_OF_MOVIES = 100;

function App() {
  const [cookie, setCookie] = useState(loadCookie() || '');
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [moviesToRate, setMoviesToRate] = useState([]);
  const [ratingMovie, setRatingMovie] = useState(false);
  const [error, setError] = useState(null);

  const loadMoviesAndSaveCookie = () => {
    loadMovies();
    saveCookie(cookie);
  };

  const loadMovies = async () => {
    setLoadingMovies(true);
    try {
      const movies = await getMovies(AMOUNT_OF_MOVIES, cookie);
      setLoadingMovies(false);
      setMoviesToRate(movies);
      setError(null);
    } catch (e) {
      setLoadingMovies(false);
      setError(e.message);
    }
  };

  const rateAndRemoveMovie = async (id, rating, authKey) => {
    setRatingMovie(true);
    await rateMovie(id, rating, authKey, cookie);
    removeFirstMovieFromMovies();
    setRatingMovie(false);
  };

  const removeFirstMovieFromMovies = () => {
    const [, ...newMoviesToRate] = moviesToRate;
    setMoviesToRate(newMoviesToRate);
  };

  useEffect(() => {
    loadMoviesIfCookieExists();
  }, []);

  const loadMoviesIfCookieExists = () => {
    if (cookie) {
      loadMovies();
    }
  };

  const movie = moviesToRate[0];

  return (
    <StrictMode>
      <Header />
      <Main
        cookie={cookie}
        loadingMovies={loadingMovies}
        movie={movie}
        ratingMovie={ratingMovie}
        error={error}
        onChangeCookie={setCookie}
        onLoadMoviesClick={loadMoviesAndSaveCookie}
        onRateMovie={rateAndRemoveMovie}
        onNextMovie={removeFirstMovieFromMovies}
      />
    </StrictMode>
  );
}

export default App;
