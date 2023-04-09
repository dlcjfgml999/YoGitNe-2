export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginFailure = (err) => {
  return {
    type: LOGIN_ERROR,
    errorMessage: err
  }
};

export const loginRequest = (username, password) => {
  return {
    type: LOGIN_REQUEST,
    username,
    password
  }
};

export const logoutRequest = () => {
  return {
    type: LOGOUT_REQUEST
  }
};

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});
