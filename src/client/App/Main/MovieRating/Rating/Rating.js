import React, { Fragment } from 'react';
import Types from 'prop-types';
import RatingButton from './RatingButton/RatingButton';
import NextButton from './NextButton';

const Rating = ({ onRate, onNext, disabled }) => {
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Fragment>
      {ratings.map(rating => (
        <RatingButton rating={rating} onRate={onRate} disabled={disabled} key={rating} />
      ))}
      <NextButton onClick={onNext} disabled={disabled} />
    </Fragment>
  );
};

Rating.propTypes = {
  onRate: Types.func.isRequired,
  onNext: Types.func.isRequired,
  disabled: Types.bool.isRequired,
};

export default Rating;
