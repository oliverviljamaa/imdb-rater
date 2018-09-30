import React, { Component, Fragment } from 'react';

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
    if (this.state.cookie) {
      this.loadMovies();
    }
  }

  setCookie = cookie => {
    this.setState({ cookie });
  };

  rateAndRemoveMovie = async (id, rating) => {
    this.setState({ ratingMovie: true });
    await rateMovie(id, rating);
    this.removeFirstMovieFromMovies();
    this.setState({ ratingMovie: false });
  };

  loadMoviesAndSaveCookie = () => {
    this.loadMovies();
    saveCookie(this.state.cookie);
  };

  removeFirstMovieFromMovies() {
    const [, ...moviesToRate] = this.state.moviesToRate;
    this.setState({ moviesToRate });
  }

  async loadMovies() {
    this.setState({ loadingMovies: true });
    try {
      const moviesToRate = await getMovies(AMOUNT_OF_MOVIES, this.state.cookie);
      this.setState({ loadingMovies: false, moviesToRate, error: null });
    } catch (error) {
      this.setState({ loadingMovies: false, error: error.message });
    }
  }

  render() {
    const { cookie, loadingMovies, moviesToRate, ratingMovie, error } = this.state;
    const movie = moviesToRate[0];

    return (
      <Fragment>
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
        />
      </Fragment>
    );
  }
}