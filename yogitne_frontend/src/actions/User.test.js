import * as actions from './User';

describe('TEST USER ACTIONS', () => {
  it('SET USER', () => {
    const req = actions.setUser('token');
    expect(req).toEqual({ type: 'USER_SET', token: 'token', isloggedin: true });
  });
  it('UNSET USER', () => {
    const req = actions.unsetUser();
    expect(req).toEqual({ type: 'USER_UNSET', isloggedin: false });
  });
});
