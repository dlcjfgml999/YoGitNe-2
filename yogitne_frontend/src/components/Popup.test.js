import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount, shallow, configure, enhance, toClass } from 'enzyme';
import Popup from './Popup';

configure({ adapter: new Adapter() });

describe('<Popup />', () => {
  it('Popup의 렌더링', () => {
    const wrapper = shallow(<Popup />);
    expect(wrapper.length).toBe(1);
  });
  it('title 입력창 렌더링', () => {
    const wrapper = mount(<Popup />);
    expect(wrapper.find('#title').length).toEqual(1);
    wrapper.find('#title').simulate('change', { target: { value: 'TITLE' } });
  });
  it('content 입력창 렌더링', () => {
    const wrapper = mount(<Popup />);
    expect(wrapper.find('#content').length).toEqual(1);
    wrapper.find('#content').simulate('change', { target: { value: 'CONTENT' } });
  });
  it('OK button Click', () => {
    const func = jest.fn();
    const wrapper = shallow(<Popup write={func} />);
    wrapper.setState({ picture: { name: 'abc' } });
    expect(wrapper.find('#OK').length).toEqual(1);
    wrapper.find('#OK').simulate('click');
    wrapper.setState({ picture: { name: 'abc.jpg' } });
    wrapper.find('#OK').simulate('click');
  });
  it('imagePreviewUrl test', () => {
    const func = jest.fn();
    const wrapper = mount(<Popup write={func} />);
    wrapper.setState({ imagePreviewUrl: '/asda.jpg' });
    expect(wrapper.state().imagePreviewUrl).toEqual('/asda.jpg');
  });
  it('File Change test', () => {
    const func = jest.fn();
    const blob = new Blob(['foo'], { type: 'text/plain' });
    const wrapper = mount(<Popup write={func} />);
    expect(wrapper.find('#file').length).toEqual(1);
    wrapper.find('#file').simulate('change', {
      target: {
        files: [blob]
      }
    });
    wrapper.find('#file').simulate('change', {
      target: {
        files: []
      }
    });
  });
});
