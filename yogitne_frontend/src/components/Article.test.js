import React from 'react';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, mount } from 'enzyme';
import Article, { mapStateToProps, mapDispatchToProps } from './Article';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('Article TEST', () => {
  it('Article Rendering', () => {
    const initialState = {
      root: {
        Article: {
          Article: [],
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
    expect(wrapper.length).toEqual(1);
  });
  it('mapStateToProps test', () => {
    const initialState = {
      root: {
        Article: {
          Article: [],
          Comment: [],
        }
      }
    };
    expect(mapStateToProps(initialState).Article).toEqual([]);
    expect(mapStateToProps(initialState).Comment).toEqual([]);
  });
  it('mapDispatchToProps Function operation: ArticleRequest', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).ArticleRequest('url');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'GETARTICLEREQUEST', url: 'url' });
  });
  it('mapDispatchToProps Function operation: CommentPost', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).CommentPost('comment', 'url');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'POSTCOMMENTREQUEST', comment: 'comment', url: 'url' });
  });
  it('mapDispatchToProps Function operation: CommentPut', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).CommentPut('comment', 'url');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'PUTCOMMENTREQUEST', comment: 'comment', url: 'url' });
  });
  it('mapDispatchToProps Function operation: CaseClose', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).CaseClose('url');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'CASECLOSEREQUEST', url: 'url' });
  });
  it('mapDispatchToProps Function operation: MoveToModify', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).MoveToModify('title', 'content', 'howtocontact', 'kind', 'url');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'MOVETOMODIFYPAGE', title: 'title', content: 'content', howtocontact: 'howtocontact', kind: 'kind', url: 'url' });
  });
  it('mapDispatchToProps Function operation: CheckInformation', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).CheckInformation('url');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'CHECKINFORMATION', url: 'url' });
  });
  it('MakeCheckerList function test', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [],
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
    expect(wrapper.length).toEqual(1);
  });
  it('MakeCheckerList function test (1)', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('#check').length).toEqual(1);
  });
  it('handleCheck function test', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
    expect(wrapper.find('#check').length).toEqual(1);
    wrapper.find('#check').simulate('click');
  });
  it('ResolvePermissionCheck function test', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
            how_to_contact: 'a',
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
  });
  it('ResolvePermissionCheck function test (1)', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/Found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
  });
  it('ResolvePermissionCheck function test (2)', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: 'aaaaaa/lost/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
  });
  it('ResolvePermissionCheck function test (3)', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
            isAuthor: true,
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: 'aaaaaa/lost/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
  });
  it('handleClick function test', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
    expect(wrapper.find('#add').length).toEqual(2);
    wrapper.find('#add').at(0).simulate('click');
  });
  it('handleChange function test', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: '/found/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
    expect(wrapper.find('#comment').length).toEqual(1);
    wrapper.find('#comment').simulate('change', { target: { value: 'abcd' } });
  });
  it('ResolveClick function test (3)', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
            isAuthor: true,
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: 'aaaaaa/lost/1',
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article location={url} store={store} /></Router></Provider>);
    expect(wrapper.find('#close').length).toEqual(2);
    wrapper.find('#close').at(0).simulate('click');
  });
  it('ModifyClick function test (3)', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
            isAuthor: true,
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: 'aaaaaa/lost/1',
    };
    const hist = [];
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article history={hist} location={url} store={store} /></Router></Provider>);
    expect(wrapper.find('#modify').length).toEqual(2);
    wrapper.find('#modify').at(0).simulate('click');
  });
  it('ModifyClick function test (3)', () => {
    const initialState = {
      root: {
        Article: {
          Article: {
            checkers: [1, 2, 3],
            isAuthor: true,
          },
          Comment: [1, 2, 3],
        }
      }
    };
    const url = {
      pathname: 'aaaaaa/fost/1',
    };
    const hist = [];
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><Article history={hist} location={url} store={store} /></Router></Provider>);
    expect(wrapper.find('#modify').length).toEqual(2);
    wrapper.find('#modify').at(0).simulate('click');
  });
});
