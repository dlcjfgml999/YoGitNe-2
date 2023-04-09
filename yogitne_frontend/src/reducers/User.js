import { USER_SET, USER_UNSET } from '../actions/User';


const initialState = {
  token: null,
  isloggedin: false,
}



const user = function userReducer (state = initialState, action) {
  switch (action.type) {
    case USER_SET:
      return Object.assign({}, state, {
        token: action.token,
        isloggedin: action.isloggedin,
      });

    case USER_UNSET:
      return Object.assign({}, state, {
        token: null,
        isloggedin: false,
      });

    default:
      return state
  }
}

export default user;
