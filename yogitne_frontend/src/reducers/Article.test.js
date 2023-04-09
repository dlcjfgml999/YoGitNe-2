import Article from './Article';
import { getOnlyArticle, getArticle, getComment } from '../actions/Article';

const InitialState = {
  Article: [],
  Comment: [],
};

describe('Article Reducer', () => {
  it('Get Article change state', () => {
    expect(Article(
      [],
      getArticle('GETARTICLE... somethings', 'GETCOMMENT.... somethings')
    )).toEqual({ Article: 'GETARTICLE... somethings', Comment: 'GETCOMMENT.... somethings' });
  });
  it('Get Only Article change state', () => {
    expect(Article(
      [],
      getOnlyArticle('GETARTICLE... somethings')
    )).toEqual({ Article: 'GETARTICLE... somethings', Comment: undefined });
  });
  it('Get Only Comment change state', () => {
    expect(Article(
      [],
      getComment('GETCOMMENT.... somethings')
    )).toEqual({ Article: undefined, Comment: 'GETCOMMENT.... somethings' });
  });
});
