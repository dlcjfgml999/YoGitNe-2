import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import NavBar from './NavBar';

const mockStore = configureMockStore();
configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
  it('NavBar의 렌더링', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<NavBar store={store} />);
    expect(wrapper.length).toBe(1);
  });
});
