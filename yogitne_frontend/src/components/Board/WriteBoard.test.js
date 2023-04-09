import React from 'react';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, mount } from 'enzyme';
import WriteBoard, { mapStateToProps, mapDispatchToProps } from './WriteBoard';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('WriteBoard TEST', () => {
  it('WriteBoard Rendering', () => {
    const initialState = {
      root: {
        Board: {
          title: 'title',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'kind',
          url: 'url',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    expect(wrapper.length).toEqual(1);
  });
  it('mapStateToProps test', () => {
    const initialState = {
      root: {
        Board: {
          title: 'title',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'kind',
          url: 'url',
        }
      }
    };
    expect(mapStateToProps(initialState).title).toEqual('title');
    expect(mapStateToProps(initialState).content).toEqual('content');
    expect(mapStateToProps(initialState).howtocontact).toEqual('howtocontact');
    expect(mapStateToProps(initialState).kind).toEqual('kind');
    expect(mapStateToProps(initialState).url).toEqual('url');
  });
  it('mapDispatchToProps Function operation: WriteMarkerRequest', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).WriteMarkerRequest('model', 'title', 'content', 'howtocontact', 0, 0);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'WRITEARTICLEREQUEST', model: 'model', title: 'title', content: 'content', howtocontact: 'howtocontact', latitude: 0, longitude: 0 });
  });
  it('mapDispatchToProps Function operation: ArticleModify', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).ArticleModify('url', 'title', 'content', 'howtocontact');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'MODIFYARTICLEREQUEST', url: 'url', title: 'title', content: 'content', howtocontact: 'howtocontact' });
  });
  it('handleChange function test', () => {
    const initialState = {
      root: {
        Board: {
          title: 'title',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'kind',
          url: 'url',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    expect(wrapper.find('#title').length).toEqual(1);
    wrapper.find('#title').simulate('change', { target: { value: 'TITLE' } });
  });
  it('handleSelectChange function test', () => {
    const initialState = {
      root: {
        Board: {
          title: '',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'kind',
          url: 'url',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    expect(wrapper.find('select').length).toEqual(1);
    wrapper.find('select').simulate('change', { target: { value: 'Found' } });
  });
  it('handleWrite function test', () => {
    const initialState = {
      root: {
        Board: {
          title: 'title',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'Lost',
          url: 'aa',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    wrapper.find('#OK').at(0).simulate('click');
  });
  it('handleWrite function test (1)', () => {
    const initialState = {
      root: {
        Board: {
          title: 'title',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'Lost',
          url: '',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    wrapper.find('#OK').at(0).simulate('click');
  });
  it('handleWrite function test (2)', () => {
    const initialState = {
      root: {
        Board: {
          title: '',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'Lost',
          url: 'aa',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    wrapper.find('#OK').at(0).simulate('click');
  });
  it('handleWrite function test (3)', () => {
    const initialState = {
      root: {
        Board: {
          title: 'title',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'Found',
          url: 'aa',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    wrapper.find('#OK').at(0).simulate('click');
  });
  it('handleWrite function test (4)', () => {
    const initialState = {
      root: {
        Board: {
          title: 'title',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'Found',
          url: '',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    wrapper.find('#OK').at(0).simulate('click');
  });
  it('handleWrite function test (5)', () => {
    const initialState = {
      root: {
        Board: {
          title: '',
          content: 'content',
          howtocontact: 'howtocontact',
          kind: 'Found',
          url: 'aa',
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><WriteBoard store={store} /></Router></Provider>);
    wrapper.find('#OK').at(0).simulate('click');
  });
});
