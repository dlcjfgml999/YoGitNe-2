import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGOUT_REQUEST } from '../actions/Login';

const initialState = {
  username: '',
  password: '',
  isLoggedin: false,
  errorMessage: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedin: true,
        errorMessage: '',
      });

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        username: '',
        password: '',
        isLoggedin: false,
        errorMessage: '',
      });

    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        username: '',
        password: '',
        isLoggedin: false,
        errorMessage: '',
      });
    default:
      return state
  }
}

export default login;
