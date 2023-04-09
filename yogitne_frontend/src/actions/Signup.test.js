import * as actions from './Signup';

describe('TEST SIGNUP ACTIONS', () => {
  it('SIGNUP REQUEST', () => {
    const req = actions.signupRequest('username', 'password');
    expect(req).toEqual({ type: 'SIGNUP_REQUEST', username: 'username', password: 'password' });
  });
});
