import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { mount, shallow, configure } from 'enzyme';
import Login, { mapDispatchToProps } from './Login';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('<Login />', () => {
  it('Login의 렌더링', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<Login store={store} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#login').length).toEqual(2);
    wrapper.find('#login').at(0).simulate('click');
  });
  it('mapDispatchToProps Function operation: onLogin', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLogin('username', 'password');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOGIN_REQUEST', username: 'username', password: 'password' });
  });
  it('mapDispatchToProps Function operation: onLogout', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onLogout();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOGOUT_REQUEST' });
  });
});
