import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const CustomNavbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Navbar expand="lg" variant="dark" bg="transparent" fixed="top">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand
          href="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          🌍
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto d-flex align-items-center"
            style={{ gap: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}
          >
            <NavLink className="nav-link" to="/" style={{ color: "black" }}>
              Home
            </NavLink>
            <NavLink
              className="nav-link"
              to="/countries"
              style={{ color: "black" }}
            >
              Countries
            </NavLink>
            {!user ? (
              <>
                <NavLink
                  className="nav-link"
                  to="/login"
                  style={{ color: "black" }}
                >
                  Login
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/signup"
                  style={{ color: "black" }}
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <Button
                variant="outline-dark"
                onClick={logout}
                className="nav-link"
                style={{ border: "none", color: "black" }}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
