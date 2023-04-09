import { take, takeEvery, put, call, fork, cancelled, takeLatest, cancel } from 'redux-saga/effects';
import * as MainActions from './actions/Main';
import * as ArticleActions from './actions/Article';
import * as BoardActions from './actions/Board';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS } from './actions/Login';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR } from './actions/Signup';
import * as MyPageActions from './actions/MyPage';
import { setUser, unsetUser, USER_UNSET } from './actions/User';
import { history } from './index';

function forwardTo(location) {
  history.push(location);
}

/* ===================================== MyPage ====================================== */
export function* GetMyPage(url) {
  const response = yield call(fetch, `http://52.79.122.22:8000/mypage/${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  console.log(response);
  const data = yield call([response, response.json]);
  console.log(data);
  yield put(MyPageActions.myPageResponse(data));
}

export function* watchGetMyPage() {
  while (true) {
    const { url } = yield take('MYPAGEREQUEST');
    yield call(GetMyPage, url);
  }
}

export function* ChangePassword(originalPassword, newPassword) {
  console.log(originalPassword);
  const info = JSON.stringify({ username: localStorage.getItem('username'), password: originalPassword });
  const response = yield call(fetch, 'http://52.79.122.22:8000/get_auth_token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: info,
  });
  if (response.status === 200) {
    const npassword = JSON.stringify({ password: newPassword });
    yield call(fetch, 'http://52.79.122.22:8000/mypage/change/', {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: npassword,
    });
    history.goBack();
  } else {
    alert('Please check your original password');
  }
}

export function* watchChangePassword() {
  while (true) {
    const { originalPassword, newPassword } = yield take('CHANGEPASSWORD');
    yield call(ChangePassword, originalPassword, newPassword);
  }
}

/* ===================================== Board ====================================== */
export function* WriteArticle(model, title, content, howtocontact, latitude, longitude, image) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('text', content);
  formData.append('how_to_contact', howtocontact);
  if (image !== undefined) {
    formData.append('image', image);
  }
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  console.log(formData);
  yield call(fetch, `http://52.79.122.22:8000/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      // 'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
  yield call(forwardTo, `/board/${model}page/1`);
}

export function* watchWriteArticle() {
  while (true) {
    const {
      model, title, content, howtocontact, latitude, longitude, image
    } = yield take('WRITEARTICLEREQUEST');
    yield call(WriteArticle, model, title, content, howtocontact, latitude, longitude, image);
  }
}

export function* GetArticles(url) {
  console.log(localStorage.getItem('token'));
  const response = yield call(fetch, `http://52.79.122.22:8000/${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  if (!response.ok) {
    yield call(forwardTo, '/Warning');
    return;
  }
  console.log(response);
  const data = yield call([response, response.json]);
  if (data.lost === undefined) {
    data.lost = [];
  } else {
    data.found = [];
  }
  console.log(data);
  yield put(BoardActions.getArticles(data));
}

export function* watchGetArticles() {
  while (true) {
    const { url } = yield take('GETARTICLESREQUEST');
    yield call(GetArticles, url);
  }
}

/* ===================================== Article ==================================== */
export function* GetDetailArticle(url) {
  // const info = JSON.stringify({ username: 'psw0946@snu.ac.kr', password: 'ag' });
  // // console.log(info);
  // let tokenresponse = yield call(fetch, 'http://52.79.122.22:8000/get_auth_token/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: info,
  // });
  // tokenresponse = yield call([tokenresponse, tokenresponse.json]);
  // // console.log(tokenresponse.token);
  let response = yield call(fetch, `http://52.79.122.22:8000${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  // console.log(response);
  const articleData = yield call([response, response.json]);
  // console.log(data);

  response = yield call(fetch, `http://52.79.122.22:8000/comment${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  // console.log(response);
  const commentData = yield call([response, response.json]);
  // console.log(commentData);
  yield put(ArticleActions.getArticle(articleData, commentData));
}

export function* watchGetDetailArticle() {
  while (true) {
    const { url } = yield take('GETARTICLEREQUEST');
    yield call(GetDetailArticle, url);
  }
}

export function* ModifyArticle(url, title, content, howtocontact, image) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('text', content);
  formData.append('how_to_contact', howtocontact);
  if (image !== undefined) {
    formData.append('image', image);
  }
  // const particle = JSON.stringify({ title: title, text: content, how_to_contact: howtocontact });
  const response = yield call(fetch, `http://52.79.122.22:8000${url}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  /*
  const response = yield call(fetch, `http://52.79.122.22:8000${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  */
  // console.log(response);
  const articleData = yield call([response, response.json]);
  // console.log(data);
  yield put(ArticleActions.getOnlyArticle(articleData));
}

export function* watchModifyArticle() {
  while (true) {
    const {
      url, title, content, howtocontact, image
    } = yield take('MODIFYARTICLEREQUEST');
    yield call(ModifyArticle, url, title, content, howtocontact, image);
  }
}
export function* PutComment(comment, url) {
  const pcomment = JSON.stringify({ text: comment });
  yield call(fetch, `http://52.79.122.22:8000/comment${url}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: pcomment,
  });
  let reurl = url.substring(0, url.length - 1);
  while (reurl[reurl.length - 1] !== '/') {
    reurl = reurl.substring(0, reurl.length - 1);
  }
  const response = yield call(fetch, `http://52.79.122.22:8000/comment${reurl}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  const data = yield call([response, response.json]);
  console.log(data);
  yield put(ArticleActions.getComment(data));
}

export function* watchPutComment() {
  while (true) {
    const { comment, url } = yield take('PUTCOMMENTREQUEST');
    yield call(PutComment, comment, url);
  }
}

export function* PostComment(comment, url) {
  // console.log(tokenresponse.token);
  const pcomment = JSON.stringify({ text: comment });
  yield call(fetch, `http://52.79.122.22:8000/comment${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: pcomment,
  });
  const response = yield call(fetch, `http://52.79.122.22:8000/comment${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  const data = yield call([response, response.json]);
  console.log(data);
  yield put(ArticleActions.getComment(data));
}

export function* watchPostComment() {
  while (true) {
    const { comment, url } = yield take('POSTCOMMENTREQUEST');
    yield call(PostComment, comment, url);
  }
}

export function* CaseClose(url) {
  yield call(fetch, `http://52.79.122.22:8000${url}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
   yield call(forwardTo, '/board/resolve/page/1');

}

export function* watchCaseClose() {
  while (true) {
    const { url } = yield take('CASECLOSEREQUEST');
    yield call(CaseClose, url);
  }
}

export function* CheckInfo(url) {
  yield call(fetch, `http://52.79.122.22:8000${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  const reqUrl = url.substring(0, url.length - 6);
  yield put(ArticleActions.getArticleRequest(reqUrl));
}

export function* watchCheckInfo() {
  while (true) {
    const { url } = yield take('CHECKINFORMATION');
    yield call(CheckInfo, url);
  }
}

/* ===================================== Main ==================================== */
export function* PostMarker(model, title, content, howtocontact, image, latitude, longitude) {
  // console.log(model);
  // console.log(title);
  // console.log(content);
  // console.log(howtocontact);
  // console.log(latitude);
  // console.log(longitude);
  const formData = new FormData();
  formData.append('title', title);
  formData.append('text', content);
  formData.append('how_to_contact', howtocontact);
  formData.append('image', image);
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  // const data = JSON.stringify({
  //   title: title, text: content, how_to_contact: howtocontact, image: image, latitude: latitude, longitude: longitude,
  // });
  // console.log(data);
  console.log(formData);
  yield call(fetch, `http://52.79.122.22:8000/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      // 'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
  yield put(MainActions.getMarkersRequest());
}

export function* GetMarkerList() {
  let response = yield call(fetch, 'http://52.79.122.22:8000/found/', {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  console.log(response.ok);
  if (!response.ok) {
    yield call(forwardTo, '/Warning');
    return;
  }
  let key = 1;
  const FoundData = yield call([response, response.json]);
  let FoundList = FoundData.filter(element => element.latitude !== 0);
  FoundList = FoundData.map((element) => {
    if (element.latitude !== 0) {
      element.kind = 'Found';
      element.key = key;
      key += 1;
      return element;
    }
    return element;
  });
  // console.log(FoundList);
  response = yield call(fetch, 'http://52.79.122.22:8000/lost', {
    method: 'GET',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    }
  });
  const LostData = yield call([response, response.json]);
  let LostList = FoundData.filter(element => element.latitude !== 0);
  LostList = LostData.map((element) => {
    element.kind = 'Lost';
    element.key = key;
    key += 1;
    return element;
  });
  // console.log(LostList);
  const data = [...FoundList, ...LostList];
  console.log(data);

  yield put(MainActions.getMarkers(data));
  console.log('Get Markers List Success');
}

export function* watchGetList() {
  yield takeEvery('GETMARKERSREQUEST', GetMarkerList);
}

export function* watchPostMarker() {
  while (true) {
    const {
      model, title, content, howtocontact, image, latitude, longitude
    } = yield take('POSTMARKERSREQUEST');
    yield call(PostMarker, model, title, content, howtocontact, image, latitude, longitude);
  }
}

export function handleApiErrors (response) {
  if (!response.ok) throw Error(response.statusText)
  return response;
}

export function loginApi (username, password) {
  const info = JSON.stringify({ username: username, password: password });
  return fetch('http://52.79.122.22:8000/get_auth_token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: info,
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* loginFlow (username, password) {
  let token
  try {
    token = yield call(loginApi, username, password)
    console.log(token.token);
    yield put({ type: LOGIN_SUCCESS });
    yield put(setUser(token));
    localStorage.setItem('token', token.token);
    localStorage.setItem('username', username);
    yield call(forwardTo, '/main');
  } catch (error) {
    yield put({ type: LOGIN_ERROR });
    alert("아이디 또는 비밀번호를 다시 확인하세요.");
  } finally {
    if (yield cancelled()) {
      yield call(forwardTo, '/account/login')
    }
  }
}



function signupApi (username, password) {
  const info = JSON.stringify({ username: username, password: password });
  console.log(info);
  return fetch( 'http://52.79.122.22:8000/signup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: info
  })
}


export function* signupFlow (action) {
  try {
    const { username, password } = action
    const response = yield call(signupApi, username, password);
    if(response.status >299) {
      if(response.status === 400) {
        alert("이미 가입한 회원입니다.");
        yield put({ type: SIGNUP_ERROR });
      }
      else{
        alert("모든 항목을 작성해 주세요.");
        yield put({ type: SIGNUP_ERROR });
        }
      }
      else {
        yield put({ type: SIGNUP_SUCCESS });
        yield call(forwardTo, '/linkpage');
      }
    } catch (error) {
      yield put({ type: SIGNUP_ERROR });
    }
  }

export function* logout () {
  yield put(unsetUser());
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  yield put({type: LOGOUT_SUCCESS});
  yield call(forwardTo, '/');
}

export function* loginWatcher () {
  while (true) {
    const { username, password } = yield take(LOGIN_REQUEST);
    const task = yield fork(loginFlow, username, password );
  }
}

export function* signupWatcher () {
  yield takeLatest(SIGNUP_REQUEST, signupFlow)
}


export function * logoutWatcher () {
  while (true) {
    yield take(LOGOUT_REQUEST);
    yield call(logout);
  }
}

export default function* rootSaga() {
  yield fork(watchGetList);
  yield fork(watchPostMarker);
  yield fork(watchGetDetailArticle);
  yield fork(watchPostComment);
  yield fork(watchPutComment);
  yield fork(watchModifyArticle);
  yield fork(watchGetArticles);
  yield fork(loginWatcher);
  yield fork(signupWatcher);
  yield fork(logoutWatcher);
  yield fork(watchCaseClose);
  yield fork(watchWriteArticle);
  yield fork(watchCheckInfo);
  yield fork(watchGetMyPage);
  yield fork(watchChangePassword);
}
