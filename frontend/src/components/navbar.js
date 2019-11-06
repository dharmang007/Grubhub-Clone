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
        <Navbar id="navbar" light expand="md">
          <NavbarBrand id="brand" color="red" href="#">GRUBHUB</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/view-restaurants">Browse Restaurants</Link></NavLink>
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