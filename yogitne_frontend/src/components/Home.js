import React, {Component} from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Jumbotron } from 'reactstrap';

const Home = () => (
  <div>
    <div className="ui center aligned container">
      <br />
      <h2 className="ui center aligned icon header">
        <i className="map marker alternate icon"></i>
          <div className="content">
            YoGitNe!
          </div>
      </h2>
    </div>
    <Container text>
      <br/>
      <Header as='h2'>Welcome to YoGitNe!</Header>
      <p>
        This application is Lost & Found App for SNU Students.
        In order to use our app, you need to verify with your SNU email.
        Click Register button on the header and just type your username without ~@snu.ac.kr.
        We will send an email to corresponding SNU ID which you just typed.
      </p>
      <br/>
      <Header as='h2'>How to Contact</Header>
    <p>
      Please mail YoGitNe@gmail.com if you need any help.
    </p>
  </Container>
  </div>
  )

export default Home
