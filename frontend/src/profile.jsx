import {useEffect} from 'react'
import axios from 'axios'
import ProjectForm from './components/ProjectForm'
import { useProjectContext } from "./hooks/useProjectContext";


const colourOptions = ["#71B548", "#FF9713", "#014399", "#F14E3A", "#EF38FF"];

const getRandomColour = () => {
  const randomIndex = Math.floor(Math.random() * colourOptions.length);
  return colourOptions[randomIndex];
};

const Profile = () => {

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

  const projectElements = projects.map((project) => {
    const randomColour = getRandomColour();
    const user = JSON.parse(localStorage.getItem('user'))
    const user_id = user.email
    
    if (user_id === project.user_id){
    return (
      <div
        className="grid-item"
        style={{ backgroundColor: randomColour }}>
        <img className="projImage" src={project.imageURL} alt="project image" />
        <h3 className="projTitle">{project.title}</h3>
        <p className="projDesc">{project.description}</p>
      </div>
    );}

  });

    if (projects === null) {
    return <p>Loading...</p>;
  }

return (
    <div>
      <ProjectForm/>
        <div>
            {projectElements}
        </div>
    </div>
  )
};
  


export default Profile
