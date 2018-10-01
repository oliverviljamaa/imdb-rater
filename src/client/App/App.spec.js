import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { loadCookie, saveCookie } from './storage/local';
import getMovies from './api/movies';
import rateMovie from './api/rating';
import Main from './Main';

jest.mock('./storage/local');
jest.mock('./api/movies');
jest.mock('./api/rating');

describe('App', () => {
  let component;
  beforeEach(() => {
    component = shallow(<App />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('on mount', () => {
    describe('when no cookie available', () => {
      beforeEach(() => {
        loadCookie.mockReturnValue(undefined);

        component = shallow(<App />);
      });

      it('does not load movies', () => {
        expect(getMovies).not.toBeCalled();
      });

      it('passes movies loading flag to main as false', () => {
        expect(loadingMovies()).toBe(false);
      });

      it('does not pass any movie to main', done => {
        process.nextTick(() => {
          expect(movie()).toBe(null);
          done();
        });
      });
    });

    describe('when a cookie is available', () => {
      beforeEach(() => {
        loadCookie.mockReturnValue('a-cookie');
        getMovies.mockReturnValue(Promise.resolve([{ id: 1 }, { id: 2 }]));
      });

      movieLoadingAssertionsForActionAndCookieAndMovies(
        () => {
          component = shallow(<App />);
        },
        'a-cookie',
        [{ id: 1 }, { id: 2 }],
      );
    });
  });

  it('changes cookie on cookie change', () => {
    expect(cookie()).toBe('');
    changeCookie('a-cookie');
    expect(cookie()).toBe('a-cookie');
  });

  describe('on load cookies click', () => {
    beforeEach(() => {
      getMovies.mockReturnValue(Promise.resolve([{ id: 3 }, { id: 4 }]));
      component = shallow(<App />);

      changeCookie('latest-cookie');
    });

    movieLoadingAssertionsForActionAndCookieAndMovies(clickOnLoadMovies, 'latest-cookie', [
      { id: 3 },
      { id: 4 },
    ]);

    it('saves cookie', () => {
      expect(saveCookie).not.toBeCalled();
      clickOnLoadMovies();
      expect(saveCookie).toBeCalledWith('latest-cookie');
    });
  });

  describe('on rating movie', () => {
    beforeEach(() => {
      component = shallow(<App />);

      getMovies.mockReturnValue(Promise.resolve([{ id: 1 }, { id: 2 }]));
      clickOnLoadMovies();
      changeCookie('a-cookie');
    });

    it('rates movie with id and rating and auth key and cookie', () => {
      expect(rateMovie).not.toBeCalled();
      rateMovieFromMain('tt1234567', 6, 'authKey for tt1234567');
      expect(rateMovie).toBeCalledWith('tt1234567', 6, 'authKey for tt1234567', 'a-cookie');
    });

    it('passes rating movie flag to main as true while loading', done => {
      expect(ratingMovie()).toBe(false);
      rateMovieFromMain('tt1234567', 6, 'authKey for tt1234567');
      expect(ratingMovie()).toBe(true);
      process.nextTick(() => {
        expect(ratingMovie()).toBe(false);
        done();
      });
    });

    it('passes next movie to main after rating', done => {
      expect(movie()).toEqual({ id: 1 });
      rateMovieFromMain('tt1234567', 6, 'authKey for tt1234567');
      process.nextTick(() => {
        expect(movie()).toEqual({ id: 2 });
        done();
      });
    });
  });

  function movieLoadingAssertionsForActionAndCookieAndMovies(action, expectedCookie, movies) {
    it('gets 100 movies with latest cookie', () => {
      expect(getMovies).not.toBeCalled();
      action();
      expect(getMovies).toBeCalledWith(100, expectedCookie);
    });

    describe('on success', () => {
      it('passes movies loading flag to main as true while loading', done => {
        expect(loadingMovies()).toBe(false);
        action();
        expect(loadingMovies()).toBe(true);
        process.nextTick(() => {
          expect(loadingMovies()).toBe(false);
          done();
        });
      });

      it('passes first retrieved movie to main', done => {
        action();
        process.nextTick(() => {
          expect(movie()).toEqual(movies[0]);
          done();
        });
      });
    });

    describe('on error', () => {
      it('passes movies loading flag to main as true while loading', done => {
        getMovies.mockImplementation(async () => {
          throw new Error('An error');
        });

        expect(loadingMovies()).toBe(false);
        action();
        expect(loadingMovies()).toBe(true);
        process.nextTick(() => {
          expect(loadingMovies()).toBe(false);
          done();
        });
      });

      it('passes error message as error to main', done => {
        getMovies.mockImplementation(async () => {
          throw new Error('An error');
        });

        action();
        process.nextTick(() => {
          expect(error()).toBe('An error');
          done();
        });
      });
    });
  }

  function main() {
    return component.find(Main);
  }

  function movie() {
    return main().prop('movie');
  }

  function loadingMovies() {
    return main().prop('loadingMovies');
  }

  function cookie() {
    return main().prop('cookie');
  }

  function error() {
    return main().prop('error');
  }

  function changeCookie(newCookie) {
    main().simulate('changeCookie', newCookie);
  }

  function clickOnLoadMovies() {
    main().simulate('loadMoviesClick');
  }

  function rateMovieFromMain(id, rating, authKey) {
    main().simulate('rateMovie', id, rating, authKey);
  }

  function ratingMovie() {
    return main().prop('ratingMovie');
  }
});
