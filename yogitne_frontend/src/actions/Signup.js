export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'


export const signupRequest = ( username, password ) => {
  return {
    type: SIGNUP_REQUEST,
    username,
    password
  }
};

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signupError = () => ({
  type: SIGNUP_ERROR,
});
