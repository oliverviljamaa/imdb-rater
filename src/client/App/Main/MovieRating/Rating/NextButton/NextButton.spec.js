import React from 'react';
import { shallow } from 'enzyme';

import NextButton from '.';

describe('Next button', () => {
  let component;
  beforeEach(() => {
    component = shallow(<NextButton onClick={jest.fn()} disabled={false} />);
  });

  it('invokes click handler on click', () => {
    const onClick = jest.fn();
    component.setProps({ onClick });

    expect(onClick).not.toBeCalled();
    component.simulate('click');
    expect(onClick).toBeCalled();
  });

  it('is disabled when should be', () => {
    component.setProps({ disabled: false });
    expect(component.prop('disabled')).toBe(false);

    component.setProps({ disabled: true });
    expect(component.prop('disabled')).toBe(true);
  });
});
