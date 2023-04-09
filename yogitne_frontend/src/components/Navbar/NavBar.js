import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import AuthNavbar from './AuthNavbar';
import PublicNavbar from './PublicNavbar';

class NavBar extends Component {
  render() {
    return (

      localStorage.getItem('token') == null ? (
        <PublicNavbar />
      )
        : (
          <AuthNavbar />
        )
    );
  }
}


export default connect()(NavBar);
