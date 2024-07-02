import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Search from "./Search";

const Navigation = ({ onSearch, query }) => {
  return (
    <Navbar bg="light" expand="lg" data-testid="nav-bar">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="w-100">
        <div className="d-flex w-100 justify-content-between">
          <div>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
          </div>
        </div>
      </Navbar.Collapse>
      <div className="ml-auto">
        <Search onSearch={onSearch} query={query} />
      </div>
    </Navbar>
  );
};

export default Navigation;
