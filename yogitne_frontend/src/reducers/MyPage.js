import * as types from '../actions/MyPage';

const InitialState = {
  myPage: {
    checking: [],
    checking_key: [],
    lost: [],
    lost_key: [],
    found: [],
    found_key: [],
    found_comments: [],
    found_comment_key: [],
    lost_comments: [],
    lost_comment_key: [],
  },
  kind: 'Found',
};

const MyPage = (state = InitialState, action) => {
  switch (action.type) {
    case types.MYPAGERESPONSE:
      return Object.assign({}, state, {
        myPage: action.myPage,
      });
    case types.CHANGEKIND:
      return Object.assign({}, state, {
        kind: action.kind,
      });
    default:
      return state;
  }
};

export default MyPage;
