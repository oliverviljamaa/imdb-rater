import React from 'react';
import { shallow } from 'enzyme';

import Rating from '.';
import RatingButton from './RatingButton';

describe('Rating', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Rating onRate={jest.fn()} disabled={false} />);
  });

  it('has rating buttons with ratings from 1 to 10', () => {
    expect(ratingButtons().map(button => button.prop('rating'))).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
    ]);
  });

  it('passes rating handler to rating buttons', () => {
    const onRate = jest.fn();
    component.setProps({ onRate });

    expect(allButtonsHavePropAsValue('onRate', onRate)).toBe(true);
  });

  it('disables all rating buttons when should', () => {
    component.setProps({ disabled: false });
    expect(allButtonsAreEnabled()).toBe(true);

    component.setProps({ disabled: true });
    expect(allButtonsAreDisabled()).toBe(true);
  });

  function ratingButtons() {
    return component.find(RatingButton);
  }

  function allButtonsAreEnabled() {
    return allButtonsHavePropAsValue('disabled', false);
  }

  function allButtonsAreDisabled() {
    return allButtonsHavePropAsValue('disabled', true);
  }

  function allButtonsHavePropAsValue(prop, value) {
    return ratingButtons().everyWhere(button => button.prop(prop) === value);
  }
});
