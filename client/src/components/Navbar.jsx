/*eslint-disable*/
import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <div>
      <Navbar style={{backgroundColor: '#494d5f'}} light expand="md">
        <NavbarBrand className="nav-name" tag={RRNavLink} to="/">
          <h5>Creative Command</h5>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
            <>
              <NavItem>
                <NavLink 
                style={{color: '#e5eaf5'}} 
                tag={RRNavLink} 
                to="/">
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink 
                style={{color: '#e5eaf5'}} 
                tag={RRNavLink} 
                to="/accounts">
                  Accounts
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink 
                  style={{color: '#e5eaf5'}} 
                  tag={RRNavLink} 
                  to="/campaigns">
                    Campaigns
                </NavLink>
              </NavItem>
            </>
            }
            
            {isLoggedIn && sessionUser.userTypeId === 1 &&
              
              <NavItem>
                <NavLink 
                  style={{color: '#e5eaf5'}} 
                  tag={RRNavLink} 
                  to="/team">
                    Team
                </NavLink>
              </NavItem>
          }
          </Nav>
          <Nav navbar>
            
            {isLoggedIn &&
              <>
              <div className="navUserContainer">
                <div className="navUserImage">
                    {!sessionUser.imageUrl ? 
                    <img src="./userIcon.png" alt="user-image" /> 
                    :
                    <img src={sessionUser.imageUrl} alt="user-image" />}
                  </div>
                </div>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer", color: '#e5eaf5' }}
                    onClick={logout}>Logout
                  </a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink 
                    tag={RRNavLink} 
                    style={{color: '#e5eaf5'}} 
                    to="/login">
                      Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
                    tag={RRNavLink} 
                    style={{color: '#e5eaf5'}} 
                    to="/register">
                      Register
                  </NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
