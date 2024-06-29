import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Search from "./Search";

const Navigation = ({ onSearch, query }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="w-100">
        <div className="d-flex w-100 justify-content-between">
          <div>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
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
