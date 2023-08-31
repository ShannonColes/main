import { useState } from "react";
import axios from "axios";

// import context hook
import { useProjectContext } from "../hooks/useProjectContext";

const ProjectDetails = ({ project }) => {
  if (!project) {
    console.error("Error not found");
    return null;
  }

  // dispatch method
  const { dispatch } = useProjectContext();

  // editing state
  const [isEditing, setIsEditing] = useState(false);

  // state for our edit form
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDescription, setEditDescription] = useState(project.description);
  const [editImage, setEditImageURL] = useState(project.image);

  // Define a function named handleEdit
  const handleEdit = () => {
    // Call a function to set the isEditing state to true
    setIsEditing(true);
  };

  // Define a function named handleCancelEdit
  const handleCancelEdit = () => {
    // Set the title back to the original projects name
    setEditTitle(project.title);

    // Set the description back to the original projects description
    setEditDescription(project.description);

    // Set the image back to the original projects image
    setEditImageURL(project.image);

    // Set the isEditing state to false, which means that the editing mode is being cancelled
    setIsEditing(false);
  };

  const handleSubmitEdit = async () => {
    // This defines the objects that are being sent up
    const updatedProjects = {
      title: setEditTitle,
      description: setEditDescription,
      imageURL: setEditImageURL,
    };

    // axios call
    // updating project
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/projects/${project._id}`,
        updatedProjects
      );
      const updatedProjects = response.data;

      if (response.status === 200) {
        console.log(updatedData);
        dispatch({ type: "UPDATE_PROJECT", payload: updatedData });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // delete project
  const handleDelete = async () => {
    const response = await axios.delete(
      `http://localhost:4000/api/projects/${project._id}`
    );

    const json = await response.data;
    if (response.status === 200) {
      console.log(json);
      dispatch({ type: "DELETE_PROJECTS", payload: json });
    }
  };

  return (
    <div className="project-details">
      {isEditing ? (
        <div className="edit-modal">
          <label>Edit Project Title:</label>
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />

          <label>Edit Description:</label>
          <input
            type="text"
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
          />

          <label>Edit Project Image:</label>
          <input
            type="text"
            value={editImage}
            onChange={(event) => setEditImageURL(event.target.value)}
          />

          <button onClick={handleSubmitEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <>
          {/* project title in an h4 tag */}
          <h4>{project.title}</h4>

          {/* project description in a p tag */}
          <p>{project.details}</p>

          {/* callimg images */}
          {project.image && (
            <img
              className="project-image"
              src={`http://localhost:4000/public/uploads/${project.image}`}
              alt="Project"
            />
          )}

          {/* delete button*/}
          {currentUser && currentUser.email === project.user_id && (
            <>
              <span onClick={handleDelete} className="delete">
                <i className="fa-solid fa-trash"></i>
              </span>
              <span onClick={handleEdit} className="edit">
                <i className="fa-solid fa-pen-to-square"></i>
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
