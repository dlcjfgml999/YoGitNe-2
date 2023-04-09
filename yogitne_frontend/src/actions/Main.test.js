import * as actions from './Main';

describe('TEST MAIN ACTIONS', () => {
  it('POST MARKER REQUEST', () => {
    const req = actions.postMarkersRequest('Found', 'title', 'content', 'howtocontact', 'image', 'latitude', 'longitude');
    expect(req).toEqual({ type: 'POSTMARKERSREQUEST', model: 'Found', title: 'title', content: 'content', howtocontact: 'howtocontact', image: 'image', latitude: 'latitude', longitude: 'longitude' });
  });
  it('GET MARKERS REQUEST', () => {
    const req = actions.getMarkersRequest();
    expect(req).toEqual({ type: 'GETMARKERSREQUEST' });
  });
  it('GET MARKERS', () => {
    const req = actions.getMarkers([1, 2, 3]);
    expect(req).toEqual({ type: 'GETMARKERS', markerList: [1, 2, 3] });
  });
  it('POST MARKERS', () => {
    const req = actions.postMarkers('title', 'contents');
    expect(req).toEqual({ type: 'POSTMARKERS', title: 'title', contents: 'contents' });
  });
});
