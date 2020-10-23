import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,

} from 'reactstrap';
import { UserContext } from "../providers/UserProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  //Tabs for the navBar on landing page go here
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="nav-name" tag={RRNavLink} to="/">
          <h5>Creative Command</h5>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={RRNavLink} to="/accounts">Accounts</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={RRNavLink} to="/campaigns">Campaigns</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={RRNavLink} to="/team">Team</NavLink>
              </NavItem>
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}>Logout
                  </a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}