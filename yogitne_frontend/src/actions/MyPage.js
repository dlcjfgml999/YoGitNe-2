export const MYPAGEREQUEST = 'MYPAGEREQUEST';
export const MYPAGERESPONSE = 'MYPAGERESPONSE';
export const CHANGEPASSWORD = 'CHANGEPASSWORD';
export const CHANGEKIND = 'CHANGEKIND';

export function myPageRequest(url) {
  return {
    type: MYPAGEREQUEST,
    url,
  };
}

export function myPageResponse(myPage) {
  return {
    type: MYPAGERESPONSE,
    myPage,
  };
}

export function changeKind(kind) {
  return {
    type: CHANGEKIND,
    kind,
  };
}

export function changePassword(originalPassword, newPassword) {
  return {
    type: CHANGEPASSWORD,
    originalPassword,
    newPassword,
  };
}
