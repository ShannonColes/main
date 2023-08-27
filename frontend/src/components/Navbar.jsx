import { Form, Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        {/* <Link to="/" className="title">Yoobee College</Link> */}
        <Link to="/">
          <h1>Yoobee College</h1>
        </Link>

        <nav>
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
                <input placeholder="Search" />
              </div>
            </div>
          </div>

          <ul className={menuOpen ? "open" : ""}>
            <li>
              <Link to="/Homepage">Home</Link>
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
      </div>
    </header>
  );
};

export default Navbar;
