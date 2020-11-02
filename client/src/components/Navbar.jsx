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
      <Navbar style={{backgroundColor: '#404346', padding:"5px 10px"}} light expand="md">
        <NavbarBrand style={{padding: '0'}} className="nav-name" tag={RRNavLink} to="/">
          <h5>Creative Command</h5>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {isLoggedIn &&
            <>
              <NavItem>
                <NavLink 
                style={{color: '#b9babb'}} 
                tag={RRNavLink} 
                to="/">
                  Home
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink 
                style={{color: '#b9babb'}} 
                tag={RRNavLink} 
                to="/accounts">
                  Accounts
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink 
                  style={{color: '#b9babb'}} 
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
                  style={{color: '#b9babb'}} 
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
                    style={{ cursor: "pointer", color: '#b9babb' }}
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
                    style={{color: '#b9babb'}} 
                    to="/login">
                      Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
                    tag={RRNavLink} 
                    style={{color: '#b9babb'}} 
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
