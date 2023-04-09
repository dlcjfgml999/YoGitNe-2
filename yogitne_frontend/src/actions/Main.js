export const GETMARKERS = 'GETMARKERS';
export const GETMARKERSREQUEST = 'GETMARKERSREQUEST';
export const POSTMARKERS = 'POSTMARKERS';
export const POSTMARKERSREQUEST = 'POSTMARKERSREQUEST';
export const MAPCLICK = 'MAPCLICK';
export const MARKERHOVER = 'MARKERHOVER';
export const FIRSTBUTTONCLICK = 'FIRSTBUTTONCLICK';
export const SECONDBUTTONCLICK = 'SECONDBUTTONCLICK';
// export const MARKERCLICK = 'MARKERCLICK';
export const CLOSEPOPUP = 'CLOSEPOPUP';

export function postMarkersRequest(model, title, content, howtocontact, image, latitude, longitude) {
  return {
    type: POSTMARKERSREQUEST,
    model,
    title,
    content,
    howtocontact,
    image,
    latitude,
    longitude
  };
}

export function getMarkersRequest() {
  return {
    type: GETMARKERSREQUEST,
  };
}

export function getMarkers(markerList) {
  return {
    type: GETMARKERS,
    markerList,
  };
}

export function postMarkers(title, contents) {
  return {
    type: POSTMARKERS,
    title,
    contents,
  };
}

export function mapClick(clickLat, clickLng) {
  return {
    type: MAPCLICK,
    clickLat,
    clickLng,
  };
}

export function markerHover(num) {
  return {
    type: MARKERHOVER,
    num
  };
}

export function firstButtonClick() {
  return {
    type: FIRSTBUTTONCLICK,
  };
}

export function secondButtonClick() {
  return {
    type: SECONDBUTTONCLICK,
  };
}
/*
export function markerClick() {
  return {
    type: MARKERCLICK,
  };
}
*/
export function closePopup() {
  return {
    type: CLOSEPOPUP,
  };
}
