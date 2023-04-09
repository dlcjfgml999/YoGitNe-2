import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Linkpage from './Linkpage';

configure({ adapter: new Adapter() });

describe('<Linkpage />', () => {
  it('Linkpage의 렌더링', () => {
    const wrapper = mount(<Linkpage />);
    expect(wrapper.length).toBe(1);
  });
});
