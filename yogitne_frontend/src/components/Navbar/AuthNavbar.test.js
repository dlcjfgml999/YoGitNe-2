import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import AuthNavbar, { mapDispatchToProps } from './AuthNavbar';

const mockStore = configureMockStore();
configure({ adapter: new Adapter() });

describe('<AuthNavbar />', () => {
  it('AuthNavbar의 렌더링', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<AuthNavbar store={store} />);
    expect(wrapper.length).toBe(1);
  });
  it('mapDispatchToProps Function operation: onLogout', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLogout();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOGOUT_REQUEST' });
  });
  it('onLogout Function test', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<AuthNavbar store={store} />);
    expect(wrapper.find('#logout').length).toEqual(2);
    wrapper.find('#logout').at(1).simulate('click');
  });
});
