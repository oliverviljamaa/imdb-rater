import React from 'react';
import { shallow } from 'enzyme';

import RatingButton from '.';

describe('Rating button', () => {
  let component;
  beforeEach(() => {
    component = shallow(<RatingButton rating={5} onRate={jest.fn()} disabled={false} />);
  });

  it('has rating as button text', () => {
    expect(component.text()).toBe('5');
  });

  it('has rating as value', () => {
    expect(component.prop('value')).toBe(5);
  });

  it('has rating as name', () => {
    expect(component.prop('name')).toBe(5);
  });

  it('invokes rating handler with rating on click', () => {
    const onRate = jest.fn();
    component.setProps({ onRate });

    expect(onRate).not.toBeCalled();
    component.simulate('click');
    expect(onRate).toBeCalledWith(5);
  });

  it('is disabled when should be', () => {
    component.setProps({ disabled: false });
    expect(component.prop('disabled')).toBe(false);

    component.setProps({ disabled: true });
    expect(component.prop('disabled')).toBe(true);
  });
});
