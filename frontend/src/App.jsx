import { useState } from "react";
import "./App.css";
import "./App.css";

// import components
import Navbar from "./components/navbar";
import Homepage from "./Homepage";
import { ProjectsContextProvider } from "./context/projectsContext";

function App() {
  return (
    <ProjectsContextProvider>
      <div className="App">
        <Navbar />
        <Homepage />
      </div>
    </ProjectsContextProvider>
  );
}

export default App;
