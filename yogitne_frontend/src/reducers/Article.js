import * as types from '../actions/Article';

const InitialState = {
  Article: {
    created_date: ''
  },
  Comment: [],
};

const Article = (state = InitialState, action) => {
  switch (action.type) {
    case types.GETONLYARTICLE:
      return Object.assign({}, state, {
        Article: action.article,
      });
    case types.GETARTICLE:
      return Object.assign({}, state, {
        Article: action.article,
        Comment: action.comment,
      });
    case types.GETCOMMENT:
      return Object.assign({}, state, {
        Comment: action.comment,
      });
    default:
      return state;
  }
};

export default Article;
