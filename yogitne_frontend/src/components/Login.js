import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest } from '../actions/Login';
import { Button } from 'reactstrap';
import '../stylesheets/form.css';
import '../stylesheets/formstyle.css';

export const Login =  ({login, onLogin, onLogout}) => {
  let username, password;
  const onLoginBtn = () => {
    onLogin(username.value, password.value);
  };

  return (

    <div className="form-page__wrapper">
      <div className='form-page__form-wrapper'>
        <div className='form-page__form-header'>
          <h2 className='form-page__form-heading'>Login</h2>
          <div className="ui divider"></div>
      <form className='form' >

        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            placeholder='USERNAME'
            name="username"
            type="text"
            ref={node => {username = node;}} />
            <label className='form__field-label'>
              Email Address
            </label>
        </div>

        <div className='form__field-wrapper'>
          <input
            className='form__field-input'
            placeholder="PASSWORD"
            name="password"
            type="password"
            ref={node => {password = node;}} />
            <label className='form__field-label' >
              Password
            </label>
          </div>
      </form>
      <div className="ui center aligned container">
        <Button className="btn btn-outline-info" type="submit" size="lg" id="login" onClick={onLoginBtn}>Login</Button>
      </div>
    </div>
    </div>
  </div>
  );
};
//
// const mapStateToProps = (state) => {
//   return {
//     login : state.login,
//   }
// };

export const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (username, password) => {
      dispatch(loginRequest(username, password))
    },
    onLogout: () => {
      dispatch(logoutRequest())
    }
  }
};

export default connect(null, mapDispatchToProps)(Login);
