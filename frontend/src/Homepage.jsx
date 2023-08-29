import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProjectForm from "./components/ProjectForm";

import { useProjectContext } from "./hooks/useProjectContext";
// import context ----------------------------------------------------------------

// import components ----------------------------------------------------------------
import headerImage from "./assets/header-background.png";
// Landing image + header
// h1 students portfolio
// grid to display students
// api call to render the students into a grid of display cards & student names/details
// student cards button to link to the portfolio page of that student.

const Homepage = () => {
  // const state

  const { projects, dispatch } = useProjectContext();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // axios call
        const response = await axios.get("http://localhost:4000/api/projects");

        // check response status is okay (200)
        if (response.status === 200) {
          console.log(response.data);
          dispatch({ type: "SET_WORKOUTS", payload: response.data });
          // setStudents(response.data);
        }
      } catch (error) {
        console.error("Error Fetching Projects/Console.Error", error);
      }
    };

    fetchProjects();
  }, []);

  if (projects === null) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="header-image">
        <img className="headerImg" src={headerImage} />
        <h2 className="header">
          Yoobee College of Creative Innovation is New Zealand’s largest
          specialist creative and technology college.
        </h2>
      </div>

      <div className="students-grid-container">
        <h1 className="section-heading">Students Portfolio</h1>
        {projects.map((project) => (
          <div key={project.id} className="grid-item">
            <h3>{project.title}</h3>
            <p>{project.details}</p>
            <Link to={`/portfolio/${project.id}`} className="view-btn">
              View
            </Link>
          </div>
        ))}
      </div>
      <ProjectForm/>
    </>
  );
};

export default Homepage;
