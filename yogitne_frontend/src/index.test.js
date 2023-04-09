import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
// import configureMockStore from 'redux-mock-store';
import { mount, shallow, configure } from 'enzyme';
import { renderApp } from './index';

configure({ adapter: new Adapter() });

describe('src/index file', () => {
  it ('should mount and check', () => {
    const wrapper = mount(<renderApp />);
    expect(wrapper.length).toBe(1);;
  });
});
