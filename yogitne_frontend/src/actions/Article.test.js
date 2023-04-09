import * as actions from './Article';

describe('TEST ARTICLE ACTIONS', () => {
  it('PUT COMMENT REQUEST', () => {
    const req = actions.putCommentRequest('comment', 'url');
    expect(req).toEqual({ type: 'PUTCOMMENTREQUEST', comment: 'comment', url: 'url' });
  });
  it('CHECK INFORMATION', () => {
    const req = actions.checkInformation('url');
    expect(req).toEqual({ type: 'CHECKINFORMATION', url: 'url' });
  });
  it('CASE CLOSE REQUEST', () => {
    const req = actions.caseCloseRequest('url');
    expect(req).toEqual({ type: 'CASECLOSEREQUEST', url: 'url' });
  });
  it('GET ARTICLE REQUEST', () => {
    const req = actions.getArticleRequest('url');
    expect(req).toEqual({ type: 'GETARTICLEREQUEST', url: 'url' });
  });
  it('GET ONLY ARTICLE REQUEST', () => {
    const req = actions.getOnlyArticle('article');
    expect(req).toEqual({ type: 'GETONLYARTICLE', article: 'article' });
  });
  it('GET COMMENT', () => {
    const req = actions.getComment('comment');
    expect(req).toEqual({ type: 'GETCOMMENT', comment: 'comment' });
  });
  it('POST COMMENT REQUEST', () => {
    const req = actions.postCommentRequest('comment', 'url');
    expect(req).toEqual({ type: 'POSTCOMMENTREQUEST', comment: 'comment', url: 'url' });
  });
  it('GET ARTICLE', () => {
    const req = actions.getArticle('article', 'comment');
    expect(req).toEqual({ type: 'GETARTICLE', article: 'article', comment: 'comment' });
  })
});
