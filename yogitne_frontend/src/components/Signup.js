import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupRequest } from '../actions/Signup';
import '../stylesheets/form.css';
import '../stylesheets/formstyle.css';
import { Button } from 'reactstrap';

export const Signup =  ({signup, onSignup }) => {
  let username, password, password_confirm;
  const onSignupBtn = () => {
    if(password.value === password_confirm.value)
      onSignup(username.value, password.value);
    else {
      alert("비밀번호가 일치하지 않습니다.")
    }
  };

  return (

    <div className="form-page__wrapper">
      <div className='form-page__form-wrapper'>
        <div className='form-page__form-header'>
          <h2 className='form-page__form-heading'>Register</h2>
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
              Username
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
          <div className='form__field-wrapper'>
            <input
              className='form__field-input'
              placeholder="PASSWORD CONFIRM"
              name="password_confirm"
              type="password"
              ref={node => {password_confirm = node;}} />
              <label className='form__field-label' >
                Password Confirm
              </label>
            </div>
      </form>
      <div className="ui center aligned container">
        <Button className="btn btn-outline-info" type="submit" size="lg" onClick={onSignupBtn}>Register</Button>
      </div>
    </div>
    </div>
  </div>
  );
};


export const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (username, password) => {
        dispatch(signupRequest(username, password))
    }
  }
};

export default connect(null, mapDispatchToProps)(Signup);
