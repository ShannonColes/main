import { useEffect } from "react";
import axios from "axios";
import ProjectForm from "./components/ProjectForm";
import { useProjectContext } from "./hooks/useProjectContext";
import ProjectDetails from "./components/ProjectDetails";

const getRandomColour = () => {
  const randomIndex = Math.floor(Math.random() * colourOptions.length);
  return colourOptions[randomIndex];
};
const colourOptions = ["#71B548", "#FF9713", "#014399", "#F14E3A", "#EF38FF"];

const Profile = ({ userId }) => {
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/projects?user_id=${userId}`
        );

        if (response.status === 200) {
          setUserProjects(response.data);
        }
      } catch (error) {
        console.error("Error Fetching User Projects:", error);
      }
    };

    fetchUserProjects();
  }, [userId]);

const randomColour = getRandomColour();
const projectElements = userProjects.map((project) => {
  return (
    <div
      key={project._id}
      className="grid-item"
      style={{ backgroundColor: randomColour }}>
      <img className="projImage" src={project.imageURL} alt="project" />
      <h3 className="projTitle">{project.title}</h3>
      <p className="projDesc">{project.description}</p>
      <ProjectDetails project={project} />
    </div>
  );
});

  return (

  <div>
    {projectElements}
    <ProjectForm />
  </div>
)
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
