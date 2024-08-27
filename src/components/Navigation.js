import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import Search from "./Search";
import "../styles/Navigation.css";

const Navigation = ({ onSearch, query, onFormSubmit }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth"); // Redirect to the sign-in page or any other page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <Navbar bg="light" expand="lg" className="fixed-top navigation-bar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Toggle for the burger menu */}
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

        {/* Search and User Icon */}
        <div className="fixed-elements d-flex align-items-center">
          <Search onSearch={onSearch} query={query} onFormSubmit={onFormSubmit} />
          <Dropdown align="end">
          {user ? (
    <Dropdown align="end">
      <Dropdown.Toggle as="a" className="user-icon nav-link">
        <FontAwesomeIcon icon={faUser} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
        <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ) : (<Nav.Link as={Link} to="/auth" className="user-icon">
    <FontAwesomeIcon icon={faUser} />
  </Nav.Link>)}
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
};

export default Navigation;
