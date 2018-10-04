import React from 'react';
import Types from 'prop-types';

const NextButton = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={() => {
      onClick();
    }}
    disabled={disabled}
  >
    Next
  </button>
);

NextButton.propTypes = {
  onClick: Types.func.isRequired,
  disabled: Types.bool.isRequired,
};

export default NextButton;
