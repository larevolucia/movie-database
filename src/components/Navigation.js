import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Search from "./Search";
import "../styles/Navigation.css";

const Navigation = ({ onSearch, query, onFormSubmit }) => {
  return (
    <Navbar bg="light" expand="lg" className="fixed-top navigation-bar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand and Toggle for the burger menu */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* The collapsible menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Fixed position for search and user icon */}
        <div className="fixed-elements">
          <Search onSearch={onSearch} query={query} onFormSubmit={onFormSubmit} />
          <Nav.Link as={Link} to="/auth" className="user-icon">
            <FontAwesomeIcon icon={faUser} />
          </Nav.Link>
        </div>
      </div>
    </Navbar>
  );
};

export default Navigation;
