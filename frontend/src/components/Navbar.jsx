import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <nav className="container">
        {/* <Link to="/" className="title">Yoobee College</Link> */}
        <Link className="logo" to="/">
          <h1>Yoobee College</h1>
        </Link>

        <button
          id="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}>
          THIS IS THE MENU BUTTON
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
              <i className="fa-solid fa-circle-user spin-hover"></i>
              {!user && [
                <Link to="/login" className="profile-btn">
                  Login
                </Link>,
                <Link to="/signup" className="profile-btn">
                  Signup
                </Link>,
              ]}
              {user && [
                <Link to="/profile">{user.email}</Link>,
                <button onClick={handleClick} className="profile-btn">
                  Log out
                </button>,
              ]}
            </div>
          </div>
        </div>

        <ul className={menuOpen ? "open" : ""}>
          {/* <li>
              <Link to="/">Home</Link>
            </li>
            <li>Students</li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
