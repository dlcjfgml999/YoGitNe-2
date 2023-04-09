import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan'
import * as saga from './sagas';


describe('saga test', () => {
  it('logoutWatcher test', () => {
    return expectSaga(saga.logoutWatcher)
      .dispatch({ type: 'LOGOUT_REQUEST' })
      .run();
  });
  it('loginWatcher test', () => {
    return expectSaga(saga.loginWatcher)
      .dispatch({ type: 'LOGIN_REQUEST' })
      .dispatch({ type: 'USER_UNSET' })
      .run();
  });
  it('signupFlow test', () => {
    return expectSaga(saga.signupFlow)
      .dispatch({ type: 'SIGNUP_REQUEST', username: 'a', password: 'b' })
      .put({ type: 'SIGNUP_ERROR' })
      .run();
  });
});
