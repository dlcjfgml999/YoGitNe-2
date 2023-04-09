import * as types from '../actions/Board';

const InitialState = {
  Articles: {
    found: [],
    lost: [],
    key: [],
  },
  kind: 'Found',
  title: '',
  content: '',
  howtocontact: '',
  url: '',
};

const Board = (state = InitialState, action) => {
  switch (action.type) {
    case types.GETARTICLES:
      return Object.assign({}, state, {
        Articles: action.articles,
      });
    case types.MOVETOWRITEPAGE:
      return Object.assign({}, state, {
        title: '',
        content: '',
        howtocontact: '',
        url: '',
        kind: action.kind,
      });
    case types.MOVETOMODIFYPAGE:
      return Object.assign({}, state, {
        title: action.title,
        content: action.content,
        howtocontact: action.howtocontact,
        kind: action.kind,
        url: action.url,
        image: action.image,
      });
    default:
      return state;
  }
};

export default Board;
