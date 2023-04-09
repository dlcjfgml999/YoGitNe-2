import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { mount, shallow, configure } from 'enzyme';
import Signup, { mapDispatchToProps } from './Signup';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('<Signup />', () => {
  it('Signup의 렌더링', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<Signup store={store} />);
    expect(wrapper.length).toBe(1);
  });
  it('mapDispatchToProps Function operation: onSignup', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSignup('username', 'password');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SIGNUP_REQUEST', username: 'username', password: 'password' });
  });
  it('onSignupBtn Function operation', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<Signup store={store} />);
    expect(wrapper.find('Button').length).toEqual(1);
    wrapper.find('Button').simulate('click');
  })
});
