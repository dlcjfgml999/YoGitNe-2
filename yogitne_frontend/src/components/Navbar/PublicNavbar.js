import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default class PublicNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar color= "navbar navbar-dark bg-dark" light expand="md" >
          <NavbarBrand className="ml-5" href="/">YoGitNe</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-5">
                  <NavLink href="/account/signup">Register</NavLink>
              </NavItem>
              <NavItem className="ml-5">
                <NavLink href="/account/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    );
  }
}
