import { useState } from 'react'
import "./App.css";
import { Routes, Route } from "react-router-dom";

// import components
import Navbar from './components/navbar';

// import pages 


function App() {


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

  return <></>;

}

export default App;
