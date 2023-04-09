export const GETARTICLEREQUEST = 'GETARTICLEREQUEST';
export const GETARTICLE = 'GETARTICLE'; // Get comment + article
export const GETONLYARTICLE = 'GETONLYARTICLE';
export const POSTCOMMENTREQUEST = 'POSTCOMMENTREQUEST';
export const PUTCOMMENTREQUEST = 'PUTCOMMENTREQUEST';
export const GETCOMMENT = 'GETCOMMENT';
export const MODIFYARTICLEREQUEST = 'MODIFYARTICLEREQUEST';
export const CASECLOSEREQUEST = 'CASECLOSEREQUEST';
export const CHECKINFORMATION = 'CHECKINFORMATION';

export function putCommentRequest(comment, url) {
  return {
    type: PUTCOMMENTREQUEST,
    comment,
    url
  };
}

export function checkInformation(url) {
  return {
    type: CHECKINFORMATION,
    url
  };
}

export function caseCloseRequest(url) {
  return {
    type: CASECLOSEREQUEST,
    url
  };
}

export function modifyArticleRequst(url, title, content, howtocontact, image) {
  return {
    type: MODIFYARTICLEREQUEST,
    url,
    title,
    content,
    howtocontact,
    image,
  };
}

export function getArticleRequest(url) {
  return {
    type: GETARTICLEREQUEST,
    url
  };
}

export function getOnlyArticle(article) {
  return {
    type: GETONLYARTICLE,
    article,
  };
}

// get overall article information (article + comment)
export function getArticle(article, comment) {
  return {
    type: GETARTICLE,
    article,
    comment,
  };
}

export function postCommentRequest(comment, url) {
  return {
    type: POSTCOMMENTREQUEST,
    comment,
    url
  };
}

export function getComment(comment) {
  return {
    type: GETCOMMENT,
    comment,
  };
}
