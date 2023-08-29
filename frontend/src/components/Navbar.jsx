import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useAuthContext()

  const {logout} = useLogout()

  const handleClick = () => {
    logout()
  }

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
              <Link to="/">Home</Link>
            </li>
            <li>Students</li>

          {user && (<div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>)}

          {!user && (<div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>)}

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
