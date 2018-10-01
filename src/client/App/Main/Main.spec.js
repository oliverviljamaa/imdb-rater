import React from 'react';
import { shallow } from 'enzyme';

import Main from '.';
import LoadMoviesForm from './LoadMoviesForm';
import Loader from './Loader';
import Error from './Error';
import MovieRating from './MovieRating';

describe('Main', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <Main
        cookie=""
        loadingMovies={false}
        movie={aMovie()}
        ratingMovie={false}
        onChangeCookie={jest.fn()}
        onLoadMoviesClick={jest.fn()}
        onRateMovie={jest.fn()}
      />,
    );
  });

  it('passes cookie to get movies form', () => {
    component.setProps({ cookie: 'a-cookie' });
    expect(getMoviesForm().prop('cookie')).toBe('a-cookie');
  });

  it('passes cookie change handler to get movies form', () => {
    const onChangeCookie = jest.fn();
    component.setProps({ onChangeCookie });
    expect(getMoviesForm().prop('onChangeCookie')).toBe(onChangeCookie);
  });

  it('passes movie loading click handler to get movies form as submit callback', () => {
    const onLoadMoviesClick = jest.fn();
    component.setProps({ onLoadMoviesClick });
    expect(getMoviesForm().prop('onSubmit')).toBe(onLoadMoviesClick);
  });

  describe('loader', () => {
    it('exists when loading', () => {
      component.setProps({ loadingMovies: true });
      expect(loader().exists()).toBe(true);
    });

    it('does not exist when not loading', () => {
      component.setProps({ loadingMovies: false });
      expect(loader().exists()).toBe(false);
    });
  });

  describe('error', () => {
    it('exists when not loading and error exists', () => {
      component.setProps({ loadingMovies: false, error: 'Some error' });
      expect(error().exists()).toBe(true);
    });

    it('does not exist when loading', () => {
      component.setProps({ loadingMovies: true, error: 'Some error' });
      expect(error().exists()).toBe(false);
    });

    it('does not exist when no error', () => {
      component.setProps({ loadingMovies: false });
      expect(error().exists()).toBe(false);
    });
  });

  describe('movie rating', () => {
    describe('when not loading and no error and movie exists', () => {
      it('exists', () => {
        component.setProps({ loadingMovies: false, movie: aMovie() });
        expect(movieRating().exists()).toBe(true);
      });

      it('gets passed movie', () => {
        expect(movieRating().prop('movie')).toEqual(aMovie());
      });

      it('gets passed movie rating handler', () => {
        const onRateMovie = jest.fn();
        component.setProps({ onRateMovie });
        expect(movieRating().prop('onRateMovie')).toBe(onRateMovie);
      });

      it('gets passed whether or not movie is being rated', () => {
        component.setProps({ ratingMovie: false });
        expect(movieRating().prop('ratingMovie')).toBe(false);

        component.setProps({ ratingMovie: true });
        expect(movieRating().prop('ratingMovie')).toBe(true);
      });
    });

    it('does not exist when loading', () => {
      component.setProps({ loadingMovies: true, movie: aMovie() });
      expect(movieRating().exists()).toBe(false);
    });

    it('does not exist when error exists', () => {
      component.setProps({ loadingMovies: false, error: 'Some error', movie: aMovie() });
      expect(movieRating().exists()).toBe(false);
    });

    it('does not exist when no movie', () => {
      component.setProps({ loadingMovies: false, movie: null });
      expect(movieRating().exists()).toBe(false);
    });
  });

  function getMoviesForm() {
    return component.find(LoadMoviesForm);
  }

  function loader() {
    return component.find(Loader);
  }

  function error() {
    return component.find(Error);
  }

  function movieRating() {
    return component.find(MovieRating);
  }

  function aMovie() {
    return {
      id: 'tt1234567',
      title: 'A title',
      posterURL: 'https://imdb.com/image.jpg',
      authKey: 'authKey for tt1234567',
    };
  }
});
