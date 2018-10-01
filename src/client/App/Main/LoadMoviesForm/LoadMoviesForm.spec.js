import React from 'react';
import { shallow } from 'enzyme';

import LoadMoviesForm from '.';

describe('Load movies form', () => {
  let component;
  beforeEach(() => {
    component = shallow(
      <LoadMoviesForm cookie="" onChangeCookie={jest.fn()} onSubmit={jest.fn()} />,
    );
  });

  it('fills cookie input with cookie', () => {
    expect(cookieInput().prop('value')).toBe('');
    component.setProps({ cookie: 'a-cookie' });
    expect(cookieInput().prop('value')).toBe('a-cookie');
  });

  it('changes cookie when cookie input is changed', () => {
    const onChangeCookie = jest.fn();
    component.setProps({ onChangeCookie });

    expect(onChangeCookie).not.toBeCalled();
    cookieInput().simulate('change', { target: { value: 'a-cookie' } });
    expect(onChangeCookie).toBeCalledWith('a-cookie');
  });

  it('submits form when form is submitted and stops it from refreshing the page', () => {
    const onSubmit = jest.fn();
    component.setProps({ onSubmit });
    const preventDefault = jest.fn();

    expect(onSubmit).not.toBeCalled();
    form().simulate('submit', { preventDefault });
    expect(onSubmit).toBeCalled();
    expect(preventDefault).toBeCalled();
  });

  function cookieInput() {
    return component.find('#cookie');
  }

  function form() {
    return component.find('form');
  }
});
