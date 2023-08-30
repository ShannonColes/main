import { Form, Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav className="container">
        {/* <Link to="/" className="title">Yoobee College</Link> */}
        <Link to="/">
          <h1>Yoobee College</h1>
        </Link>

        <button
          id="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="search-bar-container">
          <div className="input-wrapper">
            <div id="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input placeholder="Search" className="search-input" />
          </div>
        </div>

        <div className="user-login">
          <div className="user-wrapper">
            <div id="profile-icon">
              <Link to="/Signup">
                <h1><i className="fa-solid fa-circle-user spin-hover"></i> Signup</h1>
              </Link>
            </div>
          </div>
        </div>

        <ul className={menuOpen ? "open" : ""} style={{display: "none"}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Students</li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
