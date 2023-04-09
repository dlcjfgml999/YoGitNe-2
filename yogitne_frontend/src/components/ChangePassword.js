import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions/MyPage';
import '../stylesheets/form.css';
import '../stylesheets/formstyle.css';

const propTypes = {
};

const defaultProps = {
};

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalPassword: '',
      newPassword: '',
      recheckPassword: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick() {
    if (this.state.newPassword !== this.state.recheckPassword) {
      alert('새로운 비밀번호가 서로 일치하지 않습니다.');
    } else {
      this.props.ChangeRequest(this.state.originalPassword, this.state.newPassword);
    }
  }
  handleChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  render() {
    return (
      <div className="form-page__wrapper">
        <div className="form-page__form-wrapper">
          <div className="form-page__form-header">
            <h2 className="form-page__form-heading">Change Password</h2>
            <form className="form" >
              <div className="form__field-wrapper">
                <input
                  className="form__field-input"
                  placeholder="ORIGINAL PASSWORD"
                  name="originalPassword"
                  value={this.state.originalPassword}
                  onChange={this.handleChange}
                  type="password"
                />
                <label className="form__field-label">
                    Original Password
                </label>
              </div>
              <div className="form__field-wrapper">
                <input
                  className="form__field-input"
                  placeholder="NEW PASSWORD"
                  type="password"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                  name="newPassword"
                />
                <label className="form__field-label">
                  New Password
                </label>
              </div>
              <div className="form__field-wrapper">
                <input
                  className="form__field-input"
                  placeholder="RECHECK PASSWORD"
                  type="password"
                  value={this.state.recheckPassword}
                  onChange={this.handleChange}
                  name="recheckPassword"
                />
                <label className="form__field-label">
                    Recheck Password
                </label>
              </div>
            </form>
            <Button className="btn btn-outline-info" type="submit" id="login" onClick={this.handleClick}>Change</Button>
            <Button className="btn btn-outline-info" id="login" onClick={() => this.props.history.goBack()}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = propTypes;
ChangePassword.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => ({
  ChangeRequest: (originalPassword, newPassword) =>
    dispatch(actions.changePassword(originalPassword, newPassword)),
});

export default withRouter(connect(undefined, mapDispatchToProps)(ChangePassword));
