//import { Link } from "react-router-dom";
import Search from "./Search";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = ({ onSearch }) => {
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
        <Search onSearch={onSearch} />
      </div>
    </Navbar>
  );
};

export default Navigation;

//  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//    <NavDropdown.Item href="#action/3.1">Movies</NavDropdown.Item>
//    <NavDropdown.Item href="#action/3.2">
//      TV Shows
//    </NavDropdown.Item>
//    <NavDropdown.Item href="#action/3.3">People</NavDropdown.Item>
//    <NavDropdown.Divider />
//    <NavDropdown.Item href="#action/3.4">
//      What's on
//    </NavDropdown.Item>
//  </NavDropdown>;
