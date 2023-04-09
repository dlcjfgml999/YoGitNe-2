import User from './User';
import * as actions from '../actions/User';

const initialState = {
  token: null,
  isloggedin: false,
};

describe('User Reducer', () => {
  it('User Set change state', () => {
    expect(User(
      [],
      actions.setUser('someToken')
    )).toEqual({ token: 'someToken', isloggedin: true });
  });
  it('User Unset change state', () => {
    expect(User(
      [],
      actions.unsetUser()
    )).toEqual({ token: null, isloggedin: false });
  });
});
