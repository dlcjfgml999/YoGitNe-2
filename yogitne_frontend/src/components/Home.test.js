import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Home from './Home';

configure({ adapter: new Adapter() });

describe('<Home />', () => {
  it('Home의 렌더링', () => {
    const wrapper = mount(<Home />);
    expect(wrapper.length).toBe(1);
  });
});
