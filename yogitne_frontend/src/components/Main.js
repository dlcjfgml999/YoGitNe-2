import React, { Component } from 'react';
import MapContainer from './MapContainer';
// import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

class Main extends Component {
  render() {
    return (
      <div>
        <MapContainer />
      </div>
    );
  }
}

Main.propTypes = propTypes;
Main.defaultProps = defaultProps;

export default Main;
