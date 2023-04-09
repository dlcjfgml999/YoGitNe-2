import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

class Linkpage extends Component {
  render() {
    return (
      <div className="ui center aligned container">
        <br />
        <h2 className="ui center aligned icon header">
          <i className="envelope outline icon"></i>
          <div className="content">
            Welcome to YoGitNe!
            <div className="sub header">
              <br/>
              <div>
                We have sent an  email to Your SNU ID.
              </div>
              <a href= "https://mail.snu.ac.kr">
                Click this link and check your mail for verification!
              </a>
            </div>
          </div>
          <br />
        </h2>
      </div>
    );
  }
}

export default Linkpage;
