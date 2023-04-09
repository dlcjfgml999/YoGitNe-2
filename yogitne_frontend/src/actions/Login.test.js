import * as actions from './Login';

describe('TEST LOGIN ACTIONS', () => {
  it('LOGIN FAILURE', () => {
    const req = actions.loginFailure('err');
    expect(req).toEqual({ type: 'LOGIN_ERROR', errorMessage: 'err' });
  });
  it('LOGIN REQUEST', () => {
    const req = actions.loginRequest('username', 'password');
    expect(req).toEqual({ type: 'LOGIN_REQUEST', username: 'username', password: 'password' });
  });
  it('LOGOUT REQUEST', () => {
    const req = actions.logoutRequest();
    expect(req).toEqual({ type: 'LOGOUT_REQUEST' });
  });
})
