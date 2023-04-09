
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { logoutRequest } from '../../actions/Login';


class AuthNavbar extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
      }
  }
  onLogout() {
    this.props.loginRequest();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (

      <div>
        <Navbar color="navbar navbar-dark bg-dark" light expand="md">
          <NavbarBrand className="ml-5" href="/main">YoGitNe</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="ml-5">
                <NavLink href="/board/found/page/1">Dashboard</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar className="ml-5">
                <DropdownToggle nav caret>
                  MyPage
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/mypages">
                    UserInfo
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.onLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

    );
  }
}


export const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => { dispatch(logoutRequest()); }
  }
};

export default connect(null, mapDispatchToProps)(AuthNavbar);
