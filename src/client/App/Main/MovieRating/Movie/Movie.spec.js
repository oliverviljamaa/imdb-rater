import React from 'react';
import { shallow } from 'enzyme';

import Movie from '.';

describe('Movie', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Movie title="A title" posterURL="https://imdb.com/image.jpg" />);
  });

  it('has title', () => {
    expect(title().text()).toBe('A title');
  });

  it('has poster url as image src', () => {
    expect(image().prop('src')).toBe('https://imdb.com/image.jpg');
  });

  it('has title as image alt text', () => {
    expect(image().prop('alt')).toBe('A title');
  });

  function title() {
    return component.find('h2');
  }

  function image() {
    return component.find('img');
  }
});
