import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import "./App.css";

// import components & pages
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Homepage from "./Homepage";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./profile";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Homepage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={"/"} />}
            />
            <Route
              path="/profile/:userEmail"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
