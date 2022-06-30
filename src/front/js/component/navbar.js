import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>

		  <NavLink
            to="validation"
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
          >
            Verificacion
          </NavLink>

        </div>
      </div>
    </nav>
  );
};
