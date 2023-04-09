import React from 'react';
import configureMockStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, configure, mount } from 'enzyme';
import OldBoard from './OldBoard';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('OLDBOARD TEST', () => {
  let wrapper, store;

  beforeEach(() => {
    const initialState = {
      root: {
        Board: {
          Articles: [1, 2, 3, 4, 5],
        },
      },
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    wrapper = shallow(<OldBoard store={store} />);
  });
  it('Initial State To Props', () => {
    expect(wrapper.props().Articles).toEqual([1, 2, 3, 4, 5]);
  });
  it('Call componentDidMount Check', () => {
    const spy = jest.spyOn(OldBoard.prototype, 'componentDidMount');
    const wrapper2 = shallow(<OldBoard store={store} />);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });
  it('Render BoardHeader && BoardContent', () => {
    let container = wrapper.first('div');
    expect(container.length).toEqual(1);
    container = wrapper.first('BoardHeader');
    expect(container.length).toEqual(1);
    container = wrapper.first('BoardContent');
    expect(container.length).toEqual(1);
  });
  it('Call componentDidMount with mount', () => {
    const mstate = {
      root: {
        Board: {
          Articles: [],
        },
      }
    };
    const mstore = mockStore(mstate);
    const mapper = mount(<Provider store={mstore}><Router><OldBoard store={mstore} /></Router></Provider>);
  });
  it('Call ArticlesRequest Function', () => {
    wrapper.props().ArticlesRequest('url');
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'GETARTICLESREQUEST', url: 'url' });
  });
  it('Select Value Change and Function Call', () => {
    const mstate = {
      root: {
        Board: {
          Articles: [],
        },
      }
    };
    const mstore = mockStore(mstate);
    const mapper = mount(<Provider store={mstore}><Router><OldBoard store={mstore} /></Router></Provider>);
    expect(mapper.find('select').length).toEqual(1);
    mapper.find('select').simulate('change', { target: { value: 'Found' } });
    mapper.find('select').simulate('change', { target: { value: 'Lost' } });
  });
});
