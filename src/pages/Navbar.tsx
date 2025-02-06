
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        padding: "1rem",
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
        color: "red",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "1.5rem", fontWeight: "bold", letterSpacing: "1px" }}>
        🌍
      </div>

      <ul style={{ listStyleType: "none", display: "flex", gap: "1.5rem", margin: 0, padding: 0 }}>
        <li>
          <NavLink
            to="/"
            style={{
              color: "black", // اللون أسود
              textDecoration: "none",
              fontWeight: "900", // خط أثخن
              textTransform: "uppercase",
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/countries"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "900",
              textTransform: "uppercase",
            }}
          >
            Countries
          </NavLink>
        </li>
        {!user ? (
          <>
            <li>
              <NavLink
                to="/login"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "900",
                  textTransform: "uppercase",
                }}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontWeight: "900",
                  textTransform: "uppercase",
                }}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={logout}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
