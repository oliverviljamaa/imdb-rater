import React from 'react';
import { shallow } from 'enzyme';

import Error from '.';

describe('Error', () => {
  let component;
  beforeEach(() => {
    component = shallow(<Error message="Some error" />);
  });

  it('has error message', () => {
    expect(component.text()).toBe('Some error');
  });
});
