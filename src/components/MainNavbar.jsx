import React from "react";
// redux hooks
import { useDispatch } from "react-redux";
// redux actions
import { setToken } from "../actions/authSlice";
// bootstrap elements
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// bootstrap icons
import { BsBoxArrowInRight } from "react-icons/bs";
// Flat Color Icons
import { FcSettings } from "react-icons/fc";

const MainNavbar = () => {
  const dispatch = useDispatch();
  const navDropdownIcon = <FcSettings size={30} />;
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Jira Free University</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/projects">Projects</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              className="dropdown-pull-right"
              title={navDropdownIcon}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.4"
                onClick={() => dispatch(setToken(""))}
              >
                <div className="logoutcontainer">
                  <div className="logoutcontainer__item">Logout</div>
                  <BsBoxArrowInRight size={20} />
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
