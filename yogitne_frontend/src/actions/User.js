export const USER_SET = 'USER_SET'
export const USER_UNSET = 'USER_UNSET'


export function setUser (token) {
  return {
    type: USER_SET,
    token,
    isloggedin: true,
  }
}

export function unsetUser () {
  return {
    type: USER_UNSET,
    isloggedin: false,
  }
}
