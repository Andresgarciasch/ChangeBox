import React from "react";
import { Link } from "react-router-dom";
//import "src/front/styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          ChangeBox
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="validation">
                Verificacion
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="signup">
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="login">
                Ingreso
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    //     <nav className="navbar navbar-light bg-light">
    //       <div className="container">
    //         <Link to="/">
    //           <span className="navbar-brand mb-0 h1">React Boilerplate</span>
    //         </Link>
    //         <div className="ml-auto">
    //           <Link to="/demo">
    //             <button className="btn btn-primary">
    //               Check the Context in action
    //             </button>
    //           </Link>

    // 		  <Link
    //             to="validation"
    //             style={({ isActive }) =>
    //               isActive ? activeStyle : undefined
    //             }
    //           >
    //             Verificacion
    //           </Link>

    //         </div>
    //       </div>
    //     </nav>
  );
};
