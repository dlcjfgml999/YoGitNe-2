import Board from './Board';
import * as actions from '../actions/Board';

const intialState = {
  Articles: [],
  kind: 'Found',
  title: '',
  content: '',
  howtocontact: '',
  url: '',
};

describe('Board Reducer', () => {
  it('Get Article change state', () => {
    expect(Board(
      [],
      actions.getArticles('GETARTICLE... somethings')
    )).toEqual({ Articles: 'GETARTICLE... somethings' });
  });
  it('Move to Write page change state', () => {
    expect(Board(
      [],
      actions.moveToWritePage('kind')
    )).toEqual({ kind: 'kind', title: '', content: '', howtocontact: '', url: '' });
  });
  it('Move to Modify page change state', () => {
    expect(Board(
      [],
      actions.moveToModifyPage('title', 'content', '01011111111', 'kind', 'url')
    )).toEqual({ title: 'title', content: 'content', howtocontact: '01011111111', kind: 'kind', url: 'url' });
  });
});
