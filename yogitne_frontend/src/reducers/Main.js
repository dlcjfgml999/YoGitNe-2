// import { combineReducers } from 'redux';
import * as types from '../actions/Main';

const InitialState = {
  MarkerList: [],
  Found_click: false,
  Lost_click: false,
  showPopup: false,
  createLocation: [0, 0],
  InfoBoxNum: 0,
};

const Main = (state = InitialState, action) => {
  switch (action.type) {
    case types.GETMARKERS:
      return Object.assign({}, state, {
        MarkerList: action.markerList,
      });
    case types.POSTMARKERSREQUEST:
      return Object.assign({}, state, {
        Found_click: false,
        Lost_click: false,
        showPopup: false,
        createLocation: [0, 0],
      });
    case types.MAPCLICK:
      if (state.Found_click || state.Lost_click) {
        if (action.clickLat >= 37.446493198617354 && action.clickLat <= 37.468976952350616
          && action.clickLng >= 126.94715960095346 && action.clickLng <= 126.96132166455209) {
          return Object.assign({}, state, {
            InfoBoxNum: 0,
            createLocation: [action.clickLat, action.clickLng],
          });
        }
        return Object.assign({}, state, {
          InfoBoxNum: 0,
          createLocation: [0, 0],
        });
      }
      return Object.assign({}, state, {
        InfoBoxNum: 0,
      });
    case types.MARKERHOVER:
      if (!state.Found_click && !state.Lost_click) {
        return Object.assign({}, state, {
          InfoBoxNum: action.num,
        });
      }
      return state;
    case types.FIRSTBUTTONCLICK:
      if (state.Found_click || state.Lost_click) {
        if (state.createLocation[0] !== 0) {
          return Object.assign({}, state, {
            showPopup: true,
            InfoBoxNum: 0,
          });
        }
      } else if (!state.Found_click && !state.Lost_click) {
        return Object.assign({}, state, {
          Found_click: true,
          Lost_click: false,
          InfoBoxNum: 0,
        });
      }
      return state;
    case types.SECONDBUTTONCLICK:
      if (state.Found_click || state.Lost_click) {
        return Object.assign({}, state, {
          Found_click: false,
          Lost_click: false,
          showPopup: false,
          InfoBoxNum: 0,
          createLocation: [0, 0],
        });
      }
      return Object.assign({}, state, {
        Found_click: false,
        Lost_click: true,
        InfoBoxNum: 0,
      });
    case types.CLOSEPOPUP:
      return Object.assign({}, state, {
        Found_click: false,
        Lost_click: false,
        showPopup: false,
        createLocation: [0, 0],
      });
    default:
      return state;
  }
};

export default Main;
