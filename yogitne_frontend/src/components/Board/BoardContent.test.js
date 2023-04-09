import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { mount, shallow, configure, enhance, toClass } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BoardContent, { mapDispatchToProps } from './BoardContent';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('<BoardContent />', () => {
  it('BoardContent의 렌더링', () => {
    const wrapper = shallow(<BoardContent />);
    expect(wrapper.length).toBe(1);
  });
  it('mapDispatchToProps Function operation', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).MoveToWrite('Found');
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'MOVETOWRITEPAGE', kind: 'Found' });
  });
  it('Write Button Rendering and Click when FoundBoard', () => {
    const mockCallBack = jest.fn();
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><BoardContent MoveToWrite={mockCallBack} kind="found" content={[{ id: 0, title: 'title', created_date: '0000-00-00' }]} /></Router></Provider>);
    expect(wrapper.find('Button').length).toEqual(1);
    wrapper.find('Button').simulate('click');
  });
  it('Write Button Rendering and Click when LostBoard', () => {
    const mockCallBack = jest.fn();
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><BoardContent MoveToWrite={mockCallBack} kind="lost" content={[{ id: 0, title: 'title', created_date: '0000-00-00' }]} /></Router></Provider>);
    expect(wrapper.find('Button').length).toEqual(1);
    wrapper.find('Button').simulate('click');
  });
});
