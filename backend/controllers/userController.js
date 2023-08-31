const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // const user = await User.login(email,password)
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    const token = createToken(user._id);

    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfiles = async (req, res) => {
  try {
    console.log("Fetching user profiles...");
    const users = await User.find({}, "name email");
    console.log("Fetched user profiles:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    res.status(500).json({ error: "Could not fetch user profiles" });
  }
};

const getUserProjects = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log(`Fetching projects for user with user_id: ${user_id}`);

    // Fetch user projects based on user_id and respond with them
    const projects = await Project.find({ user_id });
    console.log("Fetched projects:", projects);

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Could not fetch user projects" });
  }
};

module.exports = { signUpUser, loginUser, getUserProfiles, getUserProjects };
