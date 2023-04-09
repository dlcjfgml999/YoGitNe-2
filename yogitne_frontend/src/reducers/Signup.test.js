import Signup from './Signup';
import * as actions from '../actions/Signup';

const initialState = {
  username: '',
  password: '',
  isRegistered: false,
  errorMessage: ''
};

describe('Signup Reducer', () => {
  it('Signup Request change state', () => {
    expect(Signup(
      [],
      actions.signupRequest('someName', 'somePassword')
    )).toEqual({ username: 'someName', password: 'somePassword', isRegistered: false, errorMessage: '' });
  });
  it('Signup Success change state', () => {
    expect(Signup(
      [],
      actions.signupSuccess()
    )).toEqual({ isRegistered: true, errorMessage: '' });
  });
  it('Signup Error change state', () => {
    expect(Signup(
      [],
      actions.signupError()
    )).toEqual({ isRegistered: false, errorMessage: '' });
  });
});
