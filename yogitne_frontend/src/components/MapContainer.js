import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col} from 'reactstrap';
import { history } from '../index';
import MapControl from './MapControl';
import Popup from './Popup';
import * as actions from '../actions/Main';
import '../stylesheets/font.scss';

const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox');
const { MarkerClusterer } = require('react-google-maps/lib/components/addons/MarkerClusterer');

const defaultOptions = {
  zoomControl: false,
  mapTypeControl: true,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
};

const iff = (condition, then, otherwise) => (condition ? then : otherwise);

export const MapWithAMarker = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAm4RXqqSlNKz25JN1-Ff8381Vu7BsMtto&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '800px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  (
    <GoogleMap
      onClick={props.onMarkerOut}
      defaultZoom={17}
      defaultCenter={{ lat: 37.459301, lng: 126.953053 }}
      defaultOptions={defaultOptions}
      options={{
        ...defaultOptions,
        draggableCursor: `${props.isFoundClick || props.isLostClick ? 'crosshair' : 'auto'}`
        // `${props.isFoundClick ? 'url(http://cfile4.uf.tistory.com/image/993BDE465AF591752CFCE4), crosshair' : `${props.isLostClick ? 'url(http://cfile8.uf.tistory.com/image/99D712465AF591761C96D6), crosshair' : 'auto'}`}`
        // `{${props.isFoundClick === true ? 'crosshair' : 'auto'}}`
        // 'url(http://cfile3.uf.tistory.com/image/997DAD4B5AEDECEA05755B), crosshair',
      }}
    >
      <MarkerClusterer
        onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinalIcons
        gridSize={60}
      >
        {props.markerList.map(element => (
          <div key={element.key}>
            {(props.kind === 'All' || element.kind === props.kind) && (element.latitude >= 37.446493198617354) && (element.latitude <= 37.468976952350616) && (element.longitude <= 126.96132166455209) && (element.longitude >= 126.94715960095346) ?
              <Marker
                key={element.key}
                icon={element.kind === 'Lost' ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'}
                onMouseOver={() => props.onMarkerOver(element.key)}
                onClick={element.kind === 'Lost' ? () => props.onMarkerClick(`/board/lost/${element.id}`) : () => props.onMarkerClick(`/board/found/${element.id}`)}
                onFocus={() => { console.log('OnFocus'); }}
                onBlur={() => { console.log('OnBlur'); }}
                position={{ lat: element.latitude, lng: element.longitude }}
              >
                {props.isInfoShown === element.key &&
                  <InfoBox options={{ closeBoxURL: '', enableEventPropagation: true }}>
                    <div style={{ backgroundColor: 'white', opacity: 0.8, padding: '12px', width: '220px' }}>
                      <div style={{ fontSize: '16px', fontColor: '#08233B' }}>
                        <h2 className="nanum">Title</h2>
                        <p className="nanum">{element.title}</p>
                        <h2 className="nanum">Content</h2>
                        <p className="nanum">{element.text}</p>
                        {!element.image.endsWith('default.jpg') ?
                          <div>
                            <h2 className="nanum">Image</h2>
                            <img src={element.image} alt="pic" width="200px" />
                          </div>
                          :
                          null
                        }
                      </div>
                    </div>
                  </InfoBox>}
              </Marker>
              :
              null
            }
          </div>
      ))}
      </MarkerClusterer>
      {props.isFoundClick ? <Marker icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" position={{ lat: props.createLocation[0], lng: props.createLocation[1] }} /> : iff(props.isLostClick, <Marker icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png" position={{ lat: props.createLocation[0], lng: props.createLocation[1] }} />, null)}
      <MapControl position={window.google.maps.ControlPosition.TOP_RIGHT}>
        <Button outline color="primary" id="first" onClick={props.onFirstButtonClick}>{props.isFoundClick || props.isLostClick ? 'Write' : 'Found'}</Button>
        <Button outline color="primary" id="second" style={{ margin: '20px' }} onClick={props.onSecondButtonClick}>{props.isFoundClick || props.isLostClick ? 'Cancel' : 'Lost'}</Button>
      </MapControl>
      <MapControl position={window.google.maps.ControlPosition.TOP}>
        <select style={{ height: '25px', margin: '5px' }} value={props.kind} onChange={props.handleChange}>
          <option value="All">All</option>
          <option value="Found">Found</option>
          <option value="Lost">Lost</option>
        </select>
      </MapControl>
    </GoogleMap>));

const propTypes = {
};

const defaultProps = {
};

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kind: 'All',
    };
    this.OnMarkerMouseOver = this.OnMarkerMouseOver.bind(this);
    this.OnMapClick = this.OnMapClick.bind(this);
    this.OnFirstButtonClick = this.OnFirstButtonClick.bind(this);
    this.OnSecondButtonClick = this.OnSecondButtonClick.bind(this);
    this.OnMarkerClick = this.OnMarkerClick.bind(this);
    this.OnClosePopup = this.OnClosePopup.bind(this);
    this.OnWrite = this.OnWrite.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.MarkerRequest();
  }

  OnWrite(data) {
    if (this.props.Found_click) {
      if (data.title === '' || data.content === '' || data.howtocontact === '') {
        alert('Please Type the Information in the Empty box');
      } else {
        this.props.PostMarkerRequest('found/', data.title, data.content, data.howtocontact, data.image, this.props.createLocation[0], this.props.createLocation[1]);
      }
    } else {
      if (data.title === '' || data.content === '') {
        alert('Please Type the Information in the Empty box');
        return;
      }
      this.props.PostMarkerRequest('lost/', data.title, data.content, data.howtocontact, data.image, this.props.createLocation[0], this.props.createLocation[1]);
    }
  }

  OnClosePopup() {
    this.props.ClosePopup();
  }

  OnMarkerClick(url) {
    history.push(url);
    // console.log(id);
  }

  OnFirstButtonClick() {
    this.props.FirstButtonClick();
  }

  OnSecondButtonClick() {
    this.props.SecondButtonClick();
  }

  OnMarkerMouseOver(num) {
    this.props.MouseOver(num);
  }

  OnMapClick(e) {
    // console.log(0);
    const clickLat = e.latLng.lat();
    const clickLng = e.latLng.lng();
    // console.log(this.props.Lost_click);
    this.props.MapClick(clickLat, clickLng);
  }

  handleChange(event) {
    this.setState({ kind: event.target.value });
  }

  render() {
    return (
      <div>
        <MapWithAMarker
          kind={this.state.kind}
          markerList={this.props.MarkerList}
          isInfoShown={this.props.InfoBoxNum}
          isFoundClick={this.props.Found_click}
          isLostClick={this.props.Lost_click}
          createLocation={this.props.createLocation}
          onMarkerOver={this.OnMarkerMouseOver}
          onMarkerOut={this.OnMapClick}
          onMarkerClick={this.OnMarkerClick}
          onFirstButtonClick={this.OnFirstButtonClick}
          onSecondButtonClick={this.OnSecondButtonClick}
          handleChange={this.handleChange}
        />
        {this.props.showPopup ?
          <Popup
            write={this.OnWrite}
            closePopup={this.OnClosePopup}
            Found={this.props.Found_click}
          /> : null}
      </div>
    );
  }
}

MapContainer.propTypes = propTypes;
MapContainer.defaultProps = defaultProps;

export const mapStateToProps = state => ({
  MarkerList: state.root.Main.MarkerList,
  Found_click: state.root.Main.Found_click,
  Lost_click: state.root.Main.Lost_click,
  showPopup: state.root.Main.showPopup,
  createLocation: state.root.Main.createLocation,
  InfoBoxNum: state.root.Main.InfoBoxNum,
});

export const mapDispatchToProps = dispatch => ({
  MarkerRequest: () => dispatch(actions.getMarkersRequest()),
  MapClick: (clickLat, clickLng) => dispatch(actions.mapClick(clickLat, clickLng)),
  MouseOver: num => dispatch(actions.markerHover(num)),
  FirstButtonClick: () => dispatch(actions.firstButtonClick()),
  SecondButtonClick: () => dispatch(actions.secondButtonClick()),
  ClosePopup: () => dispatch(actions.closePopup()),
  PostMarkerRequest: (model, title, content, howtocontact, image, latitude, longitude) =>
    dispatch(actions.postMarkersRequest(model, title, content, howtocontact, image, latitude, longitude)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
