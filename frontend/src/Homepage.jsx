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

import ProjectDetails from "./components/ProjectDetails";

const colourOptions = ["#71B548", "#FF9713", "#014399", "#F14E3A", "#EF38FF"];

const getRandomColour = () => {
  const randomIndex = Math.floor(Math.random() * colourOptions.length);
  return colourOptions[randomIndex];
};

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
          dispatch({ type: "SET_PROJECTS", payload: response.data });
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

  const projectElements = projects.map((project) => {
    const randomColour = getRandomColour();
    return (
      <div
        key={project._id}
        className="grid-item"
        style={{ backgroundColor: randomColour }}>
        <img className="projImage" src={project.imageURL} alt="project image" />
        <h3 className="projTitle">{project.title}</h3>
        <p className="projDesc">{project.description}</p>
        <Link
          to={`/portfolio/${project.user_id}`}
          className="view-btn"
          style={{ color: randomColour }}>
          View
        </Link>
      </div>
    );
  });

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
        {projectElements}
      </div>
      <ProjectForm />
    </>
  );
};

export default Homepage;
