import { Form, Link } from "react-router-dom";
import React, {useState} from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      <div className="container">
        {/* <Link to="/" className="title">Yoobee College</Link> */}
        <h1>Yoobee College</h1>

        <nav>
          <button
            id="menu"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
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
            <li>Home</li>
            {/* {/* <Link to="/home>home</Link"> } */}
            <li>Students</li>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar
