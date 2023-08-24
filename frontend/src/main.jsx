<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProjectsContextProvider } from "./context/projectsContext.jsx";
>>>>>>> d2be482e585168ca0d6d1b77c05b894c8b336175

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter/>
    <App />
  </React.StrictMode>,
)
=======
      <ProjectsContextProvider>
          <App />
      </ProjectsContextProvider>
  </React.StrictMode>
);
>>>>>>> d2be482e585168ca0d6d1b77c05b894c8b336175
