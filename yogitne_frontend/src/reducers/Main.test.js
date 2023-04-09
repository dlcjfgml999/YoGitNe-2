import Main from './Main';
import { getMarkers, postMarkersRequest, mapClick, markerHover,
  firstButtonClick, secondButtonClick, closePopup } from '../actions/Main';

const initialState = {
  MarkerList: [],
  Found_click: false,
  Lost_click: false,
  showPopup: false,
  createLocation: [0, 0],
  InfoBoxNum: 0,
};

describe('Main Reducer', () => {
  it('Get Markers change state', () => {
    expect(Main(
      [],
      getMarkers([1, 2, 3, 4, 5])
    )).toEqual({ MarkerList: [1, 2, 3, 4, 5] });
  });
  it('Post Marker Request change state', () => {
    expect(Main(
      [],
      postMarkersRequest('model', 'title', 'content', 'howtocontact', 'latitude', 'longitude')
    )).toEqual({ Found_click: false, Lost_click: false, showPopup: false, createLocation: [0, 0] });
  });
  it('Map Click change state', () => {
    expect(Main(
      [],
      mapClick(1, 1)
    )).toEqual({ InfoBoxNum: 0 });
  });
  it('Map Click and Produce Marker', () => {
    const tempState = {
      Found_click: true,
    };
    expect(Main(
      tempState,
      mapClick(37.45, 126.95)
    )).toEqual({ InfoBoxNum: 0, Found_click: true, createLocation: [37.45, 126.95] });
  });
  it('Marker Hover change state', () => {
    expect(Main(
      [],
      markerHover(1)
    )).toEqual({ InfoBoxNum: 1 });
  });
  it('Marker Hover not change state after clicking other buttons', () => {
    const tempState = {
      Found_click: true,
      InfoBoxNum: 10,
    };
    expect(Main(
      tempState,
      markerHover(2)
    )).toEqual({ Found_click: true, InfoBoxNum: 10 });
  });
  it('First Button Click change state at First', () => {
    expect(Main(
      [],
      firstButtonClick()
    )).toEqual({ Found_click: true, Lost_click: false, InfoBoxNum: 0 });
  });
  it('First Button Click change state at Second', () => {
    const tempState = {
      Found_click: true,
      createLocation: [10, 10],
    };
    expect(Main(
      tempState,
      firstButtonClick()
    )).toEqual({ showPopup: true, InfoBoxNum: 0, Found_click: true, createLocation: [10, 10] });
  });
  it('First Button Click no change state if createLocation is 0', () => {
    const tempState = {
      Found_click: true,
      createLocation: [0, 0]
    };
    expect(Main(
      tempState,
      firstButtonClick()
    )).toEqual({ Found_click: true, createLocation: [0, 0] });
  });
  it('Second Button Click change state', () => {
    expect(Main(
      [],
      secondButtonClick()
    )).toEqual({ Found_click: false, Lost_click: true, InfoBoxNum: 0 });
  });
  it('Second Button Click change state (2)', () => {
    const tempState = {
      Found_click: true,
    };
    expect(Main(
      tempState,
      secondButtonClick()
    )).toEqual({ Found_click: false, Lost_click: false, InfoBoxNum: 0, createLocation: [0, 0], showPopup: false });
  });
  it('Close Popup change state', () => {
    expect(Main(
      [],
      closePopup()
    )).toEqual({ Found_click: false, Lost_click: false, showPopup: false, createLocation: [0, 0] });
  });
});
