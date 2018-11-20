import React, { Component, StrictMode } from 'react';

import { loadCookie, saveCookie } from './storage/local';
import getMovies from './api/movies';
import rateMovie from './api/rating';

import Header from './Header';
import Main from './Main';

const AMOUNT_OF_MOVIES = 100;

export default class App extends Component {
  state = {
    cookie: loadCookie() || '',
    loadingMovies: false,
    moviesToRate: [],
    ratingMovie: false,
    error: null,
  };

  componentWillMount() {
    this.loadMoviesIfCookieExists();
  }

  setCookie = cookie => {
    this.setState({ cookie });
  };

  rateAndRemoveMovie = async (id, rating, authKey) => {
    const { cookie } = this.state;

    this.setState({ ratingMovie: true });
    await rateMovie(id, rating, authKey, cookie);
    this.removeFirstMovieFromMovies();
    this.setState({ ratingMovie: false });
  };

  loadMoviesAndSaveCookie = () => {
    const { cookie } = this.state;

    this.loadMovies();
    saveCookie(cookie);
  };

  removeFirstMovieFromMovies = () => {
    const { moviesToRate: currentMoviesToRate } = this.state;

    const [, ...moviesToRate] = currentMoviesToRate;
    this.setState({ moviesToRate });
  };

  loadMoviesIfCookieExists() {
    const { cookie } = this.state;

    if (cookie) {
      this.loadMovies();
    }
  }

  async loadMovies() {
    const { cookie } = this.state;

    this.setState({ loadingMovies: true });
    try {
      const moviesToRate = await getMovies(AMOUNT_OF_MOVIES, cookie);
      this.setState({ loadingMovies: false, moviesToRate, error: null });
    } catch (error) {
      this.setState({ loadingMovies: false, error: error.message });
    }
  }

  render() {
    const { cookie, loadingMovies, moviesToRate, ratingMovie, error } = this.state;
    const movie = moviesToRate[0];

    return (
      <StrictMode>
        <Header />
        <Main
          cookie={cookie}
          loadingMovies={loadingMovies}
          movie={movie}
          ratingMovie={ratingMovie}
          error={error}
          onChangeCookie={this.setCookie}
          onLoadMoviesClick={this.loadMoviesAndSaveCookie}
          onRateMovie={this.rateAndRemoveMovie}
          onNextMovie={this.removeFirstMovieFromMovies}
        />
      </StrictMode>
    );
  }
}
