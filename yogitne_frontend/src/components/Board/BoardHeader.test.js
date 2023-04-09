import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mount, shallow, configure, enhance, toClass } from 'enzyme';
import BoardHeader from './BoardHeader';

configure({ adapter: new Adapter() });

describe('<BoardHeader />', () => {
  it('BoardHeader의 렌더링', () => {
    const wrapper = shallow(<BoardHeader />);
    expect(wrapper.length).toBe(1);
  });
});
