import React from 'react';
import Types from 'prop-types';

import LoadMoviesForm from './LoadMoviesForm';
import Loader from './Loader';
import Error from './Error';
import MovieRating from './MovieRating';

const Main = ({
  cookie,
  loadingMovies,
  movie,
  ratingMovie,
  error,
  onChangeCookie,
  onLoadMoviesClick,
  onRateMovie,
}) => {
  const showLoader = loadingMovies;
  const showError = !loadingMovies && error;
  const showMovieRating = !loadingMovies && !error && movie;

  return (
    <main>
      <LoadMoviesForm
        cookie={cookie}
        onChangeCookie={onChangeCookie}
        onSubmit={onLoadMoviesClick}
      />
      {showLoader && <Loader />}
      {showError && <Error message={error} />}
      {showMovieRating && (
        <MovieRating movie={movie} onRateMovie={onRateMovie} ratingMovie={ratingMovie} />
      )}
    </main>
  );
};

Main.propTypes = {
  cookie: Types.string.isRequired,
  loadingMovies: Types.bool.isRequired,
  movie: Types.shape(),
  ratingMovie: Types.bool.isRequired,
  error: Types.string,
  onChangeCookie: Types.func.isRequired,
  onLoadMoviesClick: Types.func.isRequired,
  onRateMovie: Types.func.isRequired,
};

Main.defaultProps = {
  error: null,
  movie: null,
};

export default Main;
