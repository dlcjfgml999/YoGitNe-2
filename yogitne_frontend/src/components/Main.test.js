import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Main from './Main';

configure({ adapter: new Adapter() });

describe('<Main />', () => {
  it('Popup의 렌더링', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.length).toBe(1);
  });
});
