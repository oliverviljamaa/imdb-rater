import React, { Fragment } from 'react';
import Types from 'prop-types';
import RatingButton from './RatingButton/RatingButton';

const Rating = ({ onRate, disabled }) => {
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Fragment>
      {ratings.map(rating => (
        <RatingButton rating={rating} onRate={onRate} disabled={disabled} key={rating} />
      ))}
    </Fragment>
  );
};

Rating.propTypes = {
  disabled: Types.bool.isRequired,
  onRate: Types.func.isRequired,
};

export default Rating;
