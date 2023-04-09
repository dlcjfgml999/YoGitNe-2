import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, shallow, configure } from 'enzyme';
import MapContainer, { MapWithAMarker, mapStateToProps, mapDispatchToProps } from './MapContainer';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('<MapContainer />', () => {
  it('Main Rendering', () => {
    const initialState = {
      root: {
        Main: {
          MarkerList: [],
          Found_click: true,
          Lost_click: false,
          showPopup: false,
          createLocation: [0, 0],
          InfoBoxNum: 0,
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Provider store={store}><Router><MapContainer store={store} /></Router></Provider>);
    expect(wrapper.length).toEqual(1);
  });
  it('mapStateToProps test', () => {
    const initialState = {
      root: {
        Main: {
          MarkerList: [],
          Found_click: true,
          Lost_click: false,
          showPopup: false,
          createLocation: [0, 0],
          InfoBoxNum: 0,
        }
      }
    };
    expect(mapStateToProps(initialState).MarkerList).toEqual([]);
    expect(mapStateToProps(initialState).Found_click).toEqual(true);
    expect(mapStateToProps(initialState).Lost_click).toEqual(false);
    expect(mapStateToProps(initialState).showPopup).toEqual(false);
    expect(mapStateToProps(initialState).createLocation).toEqual([0, 0]);
    expect(mapStateToProps(initialState).InfoBoxNum).toEqual(0);
  });
  it('mapDispatchToProps Function operation: MarkerRequest', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).MarkerRequest();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'GETMARKERSREQUEST' });
  });
  it('mapDispatchToProps Function operation: MapClick', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).MapClick(0, 0);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'MAPCLICK', clickLat: 0, clickLng: 0 });
  });
  it('mapDispatchToProps Function operation: MouseOver', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).MouseOver(0);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'MARKERHOVER', num: 0 });
  });
  it('mapDispatchToProps Function operation: FirstButtonClick', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).FirstButtonClick();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'FIRSTBUTTONCLICK' });
  });
  it('mapDispatchToProps Function operation: SecondButtonClick', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).SecondButtonClick();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SECONDBUTTONCLICK' });
  });
  it('mapDispatchToProps Function operation: ClosePopup', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).ClosePopup();
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'CLOSEPOPUP' });
  });
  it('mapDispatchToProps Function operation: PostMarkerRequest', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).PostMarkerRequest('model', 'title', 'content', 'howtocontact', 'image', 0, 0);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: 'POSTMARKERSREQUEST', model: 'model', title: 'title', content: 'content', howtocontact: 'howtocontact', image: 'image', latitude: 0, longitude: 0 });
  });
  /*
  it('Main Page 내 Map 렌더링', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<MapWithAMarker />);
    expect(result).toMatchSnapshot();
  });
  */
});
