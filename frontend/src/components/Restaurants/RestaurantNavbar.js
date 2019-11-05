import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class RestaurantNavbar extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogout = () => {
    cookie.remove('restaurantId', { path: '/' })
}
  render() {

    let navLogin = null;
    
      if(cookie.load('restaurantId')){
          navLogin = (
              <Link to="/" onClick = {this.handleLogout}>Logout</Link>
          );
      }else{
          navLogin = (
              <Link to="/login"> Login</Link>
          )
      }
    return (
      <div>
        <Navbar id="navbar" light expand="md">
          <NavbarBrand id="brand" color="red" href="#">GRUBHUB</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="#">Edit Profile</Link>
              </NavItem>
              <NavItem>
                <NavLink>{navLogin}</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        
      </div>
    );
  }
}