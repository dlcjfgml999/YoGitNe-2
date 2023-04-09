import React, { Component } from 'react';

class MyPage extends Component {
  render() {
    return (
      <div className="ui center aligned container">
        <br />
        <h2 className="ui center aligned icon header">
          <i className="settings icon"></i>
          <div className="content">
            Account Settings
            <div className="sub header">Manage your account settings and find articles! </div>
          </div>
          <br />
        </h2>

        <div className="ui divider"></div>
        <br />
          <div className="ui huge horizontal list">
            <div className="item">
              <i className="clipboard icon"></i>
              <div className="content">
                <a className="header" href="http://52.79.122.22:3000/mypage/myarticle/1">Articles you wrote.</a>
              </div>
            </div>

            <div className="item">
              <i className="thumbtack icon"></i>
              <div className="content">
                <a className="header" href="http://52.79.122.22:3000/mypage/mycheck/1">Articles you checked.</a>
              </div>
            </div>

            <div className="item">
              <i className="comments icon"></i>
              <div className="content">
                <a className="header" href="http://52.79.122.22:3000/mypage/mycomment/1">Comments you left</a>
              </div>
            </div>

            <div className="item">
              <i className="shield alternate icon"></i>
              <div className="content">
                <a className="header" href="http://52.79.122.22:3000/mypage/changepassword">Change your Password.</a>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default MyPage;
