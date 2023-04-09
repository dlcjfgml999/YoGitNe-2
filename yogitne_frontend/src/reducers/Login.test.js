import Login from './Login';
import * as actions from '../actions/Login';

const initialState = {
  username: '',
  password: '',
  isLoggedin: false,
  errorMessage: '',
};

describe('Login Reducer', () => {
  it('Login Error change state', () => {
    expect(Login(
      [],
      actions.loginFailure('errorMsg')
    )).toEqual({ errorMessage: 'errorMsg' });
  });
  it('Login Success change state', () => {
    expect(Login(
      [],
      actions.loginSuccess()
    )).toEqual({ isLoggedin: true, errorMessage: '' });
  });
  it('Logout Success change state', () => {
    expect(Login(
      [],
      actions.logoutSuccess()
    )).toEqual({ username: '', password: '', isLoggedin: false, errorMessage: '' });
  });
  it('Logout Request change state', () => {
    expect(Login(
      [],
      actions.logoutRequest()
    )).toEqual({ username: '', password: '', isLoggedin: false, errorMessage: '' });
  });
});
