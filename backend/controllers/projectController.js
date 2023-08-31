const Project = require("../models/projectModel");
const User = require("../models/userModel");
//import mongoose
const mongoose = require("mongoose");

const getProjects = async (req, res) => {
  try {
    const { user_email } = req.params; // Get user_email from query parameters

    // Find the user based on the email
    const user = await User.findOne({ email: user_email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch projects for the user using their _id
    const projects = await Project.find({ user_id: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch projects" });
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;

  // Check if id is MongoDB valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Projects" });
  }

  
  // Try find a workout by its id - will set workout to it if successful
  const project = await Project.findById(id);

  // if not workout found show an error
  if (!project) {
    return res.status(404).json({ error: "No such project" });
  }

  //Otherwise return the workout found
  res.status(200).json(project);
};

const createProject = async (req, res) => {
  const { title, description, imageURL, user_id } = req.body;

  try {
    const project = await Project.create({
      title,
      description,
      imageURL,
      user_id,
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a workout
const updateProject = async (req, res) => {
  const { id } = req.params;

  //check if the id is MongoDB valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Project" });
  }

  // find a work by its id and if it finds it
  // spread out the properties and change what it recieves
  // from the request body eg it could just be the title changed or everything
  const project = await Project.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  //if it cant find a workout by a valid id:
  if (!project) {
    return res.status(404).json({ error: "No such project" });
  }

  // Otherwise return the updated workout
  res.status(200).json(project);
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such project" });
  }

  const project = await Project.findOneAndDelete({ _id: id });

  if (!project) {
    return res.status(404).json({ error: "No such project" });
  }

  res.status(200).json(project);
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
