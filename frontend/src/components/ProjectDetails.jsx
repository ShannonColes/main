import React, { useState, useEffect } from "react";
import axios from "axios";
import { useProjectContext } from "../hooks/useProjectContext";

const ProjectDetails = ({ project }) => {
  if (!project) {
    console.error("Error not found");
    return null;
  }

  const { dispatch } = useProjectContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(project.title);
  const [editDescription, setEditDescription] = useState(project.description);
  const [editImage, setEditImageURL] = useState(project.image);

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/projects/${project._id}`
      );
      const updatedData = response.data;

      if (response.status === 200) {
        dispatch({ type: "UPDATE_PROJECT", payload: updatedData });
      }
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditImageURL(project.image);
    setIsEditing(false);
  };

  const handleSubmitEdit = async () => {
    const updatedProjects = {
      title: editTitle,
      description: editDescription,
      image: editImage, // Assuming the field name should be "image" not "imageURL"
    };

    try {
      const response = await axios.patch(
        `http://localhost:4000/api/projects/${project._id}`,
        updatedProjects
      );

      const updatedData = response.data;

      if (response.status === 200) {
        dispatch({ type: "UPDATE_PROJECT", payload: updatedData });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/projects/${project._id}`
      );

      if (response.status === 200) {
        fetchUpdatedData();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedData();
  }, []);

  return (
    <div className="project-details">
      {isEditing ? (
        <div className="edit-modal">
          {/* ... your edit form inputs ... */}
          <button onClick={handleSubmitEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <>
          <h4>{project.title}</h4>
          <p>{project.description}</p>

          {project.image && (
            <img
              className="project-image"
              src={`http://localhost:4000/public/uploads/${project.image}`}
              alt="Project"
            />
          )}

          <span onClick={handleDelete} className="delete">
            <i className="fa-solid fa-trash"></i>
          </span>
          <span onClick={handleEdit} className="edit">
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
