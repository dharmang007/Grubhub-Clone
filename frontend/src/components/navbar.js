import React from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import "./navbar.css"; 
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class GeneralNavbar extends React.Component {
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
      localStorage.clear();
  }
  render() {

    let navLogin = null;
        
      if(localStorage.token){
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

        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/>
          </a>
        </nav>
        <Navbar id="navbar" light expand="md">
          <NavbarBrand id="brand" color="red" href="#">GRUBHUB</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/view-restaurants">Browse Restaurants</Link>
              </NavItem>
              <NavItem>
                {navLogin}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        
      </div>
    );
  }
}