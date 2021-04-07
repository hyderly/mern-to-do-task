import React from "react";
import { Link } from "react-router-dom";

import "./nav.styles.css";

const Nav = () => {
  return (
    <div className="nav-box">
      <Link to="/" className="nav-title">
        To-Do
      </Link>
      <div className="nav-links">
        <Link to="/to-do" className="nav-links">
          Todo's
        </Link>
        <Link to="/account" className="nav-links">
          Account
        </Link>
        <Link to="/login" className="nav-links">
          Login
        </Link>
        <Link to="/register" className="nav-links">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Nav;
