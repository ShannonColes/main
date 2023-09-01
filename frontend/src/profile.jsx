import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectDetails from "./components/ProjectDetails";
import ProjectForm from "./components/ProjectForm";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import userImage from "./assets/user.png";

const getRandomColour = () => {
  const randomIndex = Math.floor(Math.random() * colourOptions.length);
  return colourOptions[randomIndex];
};

const colourOptions = ["#71B548", "#FF9713", "#014399", "#F14E3A", "#EF38FF"];

const Profile = () => {
  const [userProjects, setUserProjects] = useState([]);
  const { userEmail } = useParams();
  const { profiles } = useAuthContext();

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

  const selectedUserProfile = profiles.filter(
    (profile) => profile.email === userEmail
  );

  const profileElements = selectedUserProfile.map((profile) => (
    <div className="profileGridContainer" key={profile.email}>
      <img className="projImage" src={userImage} />
      <h2 className="userTitle">{profile.name}</h2>
      <p className="profileDesc">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>
  ));

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user.email;

  if (user_id === userEmail) {
    return (
      <div>
        {profileElements}
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
        {profileElements}
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
      </div>
    );
  }
};
export default Profile;
