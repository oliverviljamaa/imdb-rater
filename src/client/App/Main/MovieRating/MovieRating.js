import React, { Fragment } from 'react';
import Types from 'prop-types';

import Movie from './Movie';
import Rating from './Rating';

const MovieRating = ({ movie, onRateMovie, ratingMovie, onNextMovie }) => {
  const { id, title, posterURL, authKey } = movie;

  return (
    <Fragment>
      <Movie title={title} posterURL={posterURL} />

      <Rating
        onRate={rating => {
          onRateMovie(id, rating, authKey);
        }}
        onNext={onNextMovie}
        disabled={ratingMovie}
      />
    </Fragment>
  );
};

MovieRating.propTypes = {
  movie: Types.shape({
    id: Types.string.isRequired,
    title: Types.string.isRequired,
    posterURL: Types.string.isRequired,
    authKey: Types.string.isRequired,
  }).isRequired,
  onRateMovie: Types.func.isRequired,
  onNextMovie: Types.func.isRequired,
  ratingMovie: Types.bool.isRequired,
};

export default MovieRating;
