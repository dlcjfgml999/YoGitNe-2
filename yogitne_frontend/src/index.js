import { Router, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import Main from './components/Main';
import NavBar from './components/Navbar/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Article from './components/Article';
import Linkpage from './components/Linkpage';
import MyPage from './components/MyPage';
import Home from './components/Home';
import FoundBoard from './components/Board/FoundBoard';
import LostBoard from './components/Board/LostBoard';
import OldBoard from './components/Board/OldBoard';
import ResolveBoard from './components/Board/ResolveBoard';
import BoardHeader from './components/Board/BoardHeader';
import WriteBoard from './components/Board/WriteBoard';
import MyComment from './components/MyComment';
import MyCheck from './components/MyCheck';
import MyArticle from './components/MyArticle';
import ChangePassword from './components/ChangePassword';
import Warning from './components/Warning';
import rootSaga from './sagas';
import Accounts from './components/Accounts';

const history = createHistory();
export { history };

const logger = createLogger();


const reducers = combineReducers({
  root: reducer,
});


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

const root = document.getElementById('root');

export const renderApp = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <Route path="/account" component={Accounts} />
        <Route path="/account/login" component={Login} />
        <Route path="/account/signup" component={Signup} />
        <Route path="/main" component={Main} />
        <Route path="/Warning" component={Warning} />
        <Route path="/mypage/myarticle" component={MyArticle} />
        <Route path="/mypage/mycheck" component={MyCheck} />
        <Route path="/mypage/mycomment" component={MyComment} />
        <Route path="/linkpage" component={Linkpage} />
        <Route path="/mypages" component={MyPage} />
        <Route path="/mypage/changepassword" component={ChangePassword} />
        <Route exact path="/board" component={FoundBoard} />
        <Route path="/board/found/page" component={FoundBoard} />
        <Route path="/board/lost/page" component={LostBoard} />
        <Route path="/board/old/page" component={OldBoard} />
        <Route exact path="/board/write" component={WriteBoard} />
        <Route path="/board/resolve/page" component={ResolveBoard} />
        <Route exact path="/board/found/:id" component={Article} />
        <Route exact path="/board/lost/:id" component={Article} />
      </div>
    </Router>
  </Provider>
);

render(renderApp(), root || document.createElement('div'));
