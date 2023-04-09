import { combineReducers } from 'redux';
import Main from './Main';
import Article from './Article';
import Board from './Board';
import login from './Login';
import signup from './Signup';
import user from './User';
import MyPage from './MyPage';

const reducer = combineReducers({
  Main,
  Article,
  Board,
  login,
  signup,
  user,
  MyPage,
});

export default reducer;
