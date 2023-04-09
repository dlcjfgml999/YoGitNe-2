export const GETARTICLESREQUEST = 'GETARTICLESREQUEST';
export const GETARTICLES = 'GETARTICLES';
export const WRITEARTICLEREQUEST = 'WRITEARTICLEREQUEST';
export const MOVETOWRITEPAGE = 'MOVETOWRITEPAGE';
export const MOVETOMODIFYPAGE = 'MOVETOMODIFYPAGE';

export function moveToModifyPage(title, content, howtocontact, kind, url, image) {
  return {
    type: MOVETOMODIFYPAGE,
    title,
    content,
    howtocontact,
    kind,
    url,
    image,
  };
}

export function moveToWritePage(kind) {
  return {
    type: MOVETOWRITEPAGE,
    kind,
  };
}

export function writeArticleRequest(model, title, content, howtocontact, latitude, longitude, image) {
  return {
    type: WRITEARTICLEREQUEST,
    model,
    title,
    content,
    howtocontact,
    latitude,
    longitude,
    image
  };
}

export function getArticleRequest(url) {
  return {
    type: GETARTICLESREQUEST,
    url
  };
}

export function getArticles(articles) {
  return {
    type: GETARTICLES,
    articles,
  };
}
