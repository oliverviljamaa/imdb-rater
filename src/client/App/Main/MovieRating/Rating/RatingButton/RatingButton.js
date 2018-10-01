import React from 'react';
import Types from 'prop-types';

const RatingButton = ({ rating, onRate, disabled }) => (
  <button
    value={rating}
    name={rating}
    onClick={() => {
      onRate(rating);
    }}
    disabled={disabled}
    type="button"
  >
    {rating}
  </button>
);

RatingButton.propTypes = {
  rating: Types.number.isRequired,
  disabled: Types.bool.isRequired,
  onRate: Types.func.isRequired,
};

export default RatingButton;
