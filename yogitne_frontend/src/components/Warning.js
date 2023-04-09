import React, { Component } from 'react';
// import PropTypes from 'prop-types';

const propTypes = {
};

const defaultProps = {
};

class Warning extends Component {
  render() {
    return (
      <div>
        <h1>Please Sign In and Authenticate Your Account through MySNU Mail Service.</h1>
      </div>
    );
  }
}

Warning.propTypes = propTypes;
Warning.defaultProps = defaultProps;

export default Warning;
