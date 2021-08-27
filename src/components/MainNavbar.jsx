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
import { useHistory } from "react-router";

const MainNavbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const navDropdownIcon = <FcSettings size={30} />;
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Jira Free University</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown
              className="dropdown-pull-right"
              title={navDropdownIcon}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  dispatch(setToken(""));
                  history.push("/login");
                }}
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
