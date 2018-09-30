import React, { Fragment } from 'react';
import Types from 'prop-types';

const Movie = ({ title, posterURL }) => (
  <Fragment>
    <h2>{title}</h2>
    <img src={posterURL} alt={title} />
  </Fragment>
);

Movie.propTypes = {
  title: Types.string.isRequired,
  posterURL: Types.string.isRequired,
};

export default Movie;
