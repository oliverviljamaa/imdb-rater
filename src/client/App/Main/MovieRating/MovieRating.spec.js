import React from 'react';
import { shallow } from 'enzyme';

import MovieRating from '.';
import Movie from './Movie';
import Rating from './Rating';

describe('Movie rating', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <MovieRating
        movie={{
          id: 'tt1234567',
          title: 'Some title',
          posterURL: 'https://imdb.com/image.jpg',
          authKey: 'authKey for tt1234567',
        }}
        onRateMovie={jest.fn()}
        ratingMovie={false}
        onNextMovie={jest.fn()}
      />,
    );
  });

  it('passes movie title', () => {
    expect(movie().prop('title')).toBe('Some title');
  });

  it('passes movie poster url', () => {
    expect(movie().prop('posterURL')).toBe('https://imdb.com/image.jpg');
  });

  it('invokes movie rating handler with id and rating and auth key when movie is rated', () => {
    const onRateMovie = jest.fn();
    component.setProps({ onRateMovie });

    expect(onRateMovie).not.toBeCalled();
    rating().simulate('rate', 5);
    expect(onRateMovie).toBeCalledWith('tt1234567', 5, 'authKey for tt1234567');
  });

  it('passes rating it should not be disabled when not rating movie', () => {
    component.setProps({ ratingMovie: false });
    expect(rating().prop('disabled')).toBe(false);
  });

  it('passes rating it should be disabled when rating movie', () => {
    component.setProps({ ratingMovie: true });
    expect(rating().prop('disabled')).toBe(true);
  });

  it('passes next movie handler to rating', () => {
    const onNextMovie = jest.fn();
    component.setProps({ onNextMovie });
    expect(rating().prop('onNext')).toBe(onNextMovie);
  });

  function movie() {
    return component.find(Movie);
  }

  function rating() {
    return component.find(Rating);
  }
});
