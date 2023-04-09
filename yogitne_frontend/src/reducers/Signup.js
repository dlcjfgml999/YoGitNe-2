import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from '../actions/Signup';

const initialState = {
  username: '',
  password: '',
  isRegistered: false,
  errorMessage: ''
};

const signup = (state = initialState, action) =>  {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        username: action.username,
        password: action.password,
        isRegistered: false,
        errorMessage: ''
      };

    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isRegistered: true,
        errorMessage: ''
      });

    case SIGNUP_ERROR:
      return Object.assign({}, state, {
        isRegistered: false,
        errorMessage: ''
      });

    default:
      return state
  }
}

export default signup;
