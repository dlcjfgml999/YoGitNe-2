import * as actions from './Board';

describe('TEST BOARD ACTIONS', () => {
  it('MOVE TO MODFIY PAGE', () => {
    const req = actions.moveToModifyPage('title', 'content', 'howtocontact', 'kind', 'url');
    expect(req).toEqual({ type: 'MOVETOMODIFYPAGE', title: 'title', content: 'content', howtocontact: 'howtocontact', kind: 'kind', url: 'url' });
  });
  it('MOVE TO WRITE PAGE', () => {
    const req = actions.moveToWritePage('kind');
    expect(req).toEqual({ type: 'MOVETOWRITEPAGE', kind: 'kind' });
  });
  it('WRITE ARTICLE REQUEST', () => {
    const req = actions.writeArticleRequest('model', 'title', 'content', 'howtocontact', 'latitude', 'longitude');
    expect(req).toEqual({ type: 'WRITEARTICLEREQUEST', model: 'model', title: 'title', content: 'content', howtocontact: 'howtocontact', latitude: 'latitude', longitude: 'longitude' });
  });
});
