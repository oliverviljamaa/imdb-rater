import React from 'react';
import Types from 'prop-types';

const LoadMoviesForm = ({ cookie, onChangeCookie, onSubmit }) => (
  <form
    onSubmit={event => {
      event.preventDefault();
      onSubmit();
    }}
  >
    <label htmlFor="cookie">IMDb cookie</label>
    <input
      type="text"
      id="cookie"
      required
      value={cookie}
      onChange={event => {
        onChangeCookie(event.target.value);
      }}
    />

    <button type="submit">Get movies</button>
  </form>
);

LoadMoviesForm.propTypes = {
  cookie: Types.string.isRequired,
  onChangeCookie: Types.func.isRequired,
  onSubmit: Types.func.isRequired,
};

export default LoadMoviesForm;
