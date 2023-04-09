import { createStore } from 'redux';
import reducer from './index';
import Main from './Main';
import Article from './Article';
import Board from './Board';
import login from './Login';
import signup from './Signup';
import user from './User';

const store = createStore(reducer);

describe('Root Reducer', () => {
  it('Main InitialState', () => {
    expect(store.getState().Main).toEqual(Main(undefined, {}));
  });
  it('Article InitialState', () => {
    expect(store.getState().Article).toEqual(Article(undefined, {}));
  });
  it('Board InitialState', () => {
    expect(store.getState().Board).toEqual(Board(undefined, {}));
  });
  it('login InitialState', () => {
    expect(store.getState().login).toEqual(login(undefined, {}));
  });
  it('signup InitialState', () => {
    expect(store.getState().signup).toEqual(signup(undefined, {}));
  });
  it('user InitialState', () => {
    expect(store.getState().user).toEqual(user(undefined, {}));
  });
})
