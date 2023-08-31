import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectDetails from "./components/ProjectDetails";
import ProjectForm from "./components/ProjectForm";
import { useParams } from "react-router-dom";

const getRandomColour = () => {
  const randomIndex = Math.floor(Math.random() * colourOptions.length);
  return colourOptions[randomIndex];
};

const colourOptions = ["#71B548", "#FF9713", "#014399", "#F14E3A", "#EF38FF"];

const Profile = () => {
  const [userProjects, setUserProjects] = useState([]);
  const { userEmail } = useParams();

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects`);
        console.log("API RESPONSE:", response.data);
        if (response.status === 200) {
          setUserProjects(response.data);
        }
      } catch (error) {
        console.error("Error Fetching User Projects:", error);
      }
    };

    fetchUserProjects();
  }, []);

  const randomColour = getRandomColour();

  const selectedUserProjects = userProjects.filter(
    (project) => project.user_id === userEmail
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.email;

  if (user_id === userEmail) {
    return (
      <div>
        <div>
          {selectedUserProjects.map((project) => (
            <div
              key={project._id}
              className="grid-item"
              style={{ backgroundColor: randomColour }}>
              <img className="projImage" src={project.imageURL} alt="project" />
              <h3 className="projTitle">{project.title}</h3>
              <p className="projDesc">{project.description}</p>
              <ProjectDetails project={project} />
            </div>
          ))}
        </div>
        <ProjectForm />
      </div>
    );
  } else {
    return (
      <div>
        {selectedUserProjects.map((project) => (
          <div
            key={project._id}
            className="grid-item"
            style={{ backgroundColor: randomColour }}>
            <img className="projImage" src={project.imageURL} alt="project" />
            <h3 className="projTitle">{project.title}</h3>
            <p className="projDesc">{project.description}</p>
          </div>
        ))}
      </div>
    );
  }
};
//   const { projects, dispatch } = useProjectContext();
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/projects");

//         if (response.status === 200) {
//           dispatch({ type: "SET_PROJECTS", payload: response.data });
//         }
//       } catch (error) {
//         console.error("Error Fetching Projects:", error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const projectElements = projects.map((project) => {
//     return (
//       <div
//         key={project._id}
//         className="grid-item"
//         style={{ backgroundColor: randomColour }}>
//         <img className="projImage" src={project.imageURL} alt="project" />
//         <h3 className="projTitle">{project.title}</h3>
//         <p className="projDesc">{project.description}</p>
//         <ProjectDetails project={project} currentUser={user} />
//       </div>
//     );
//   });

//   if (projects === null) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <ProjectForm />
//       <div>{projectElements}</div>
//     </div>
//   );
// };

export default Profile;
