//Import express
const express = require("express");
const router = express.Router();

//Import controllers
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.get("/", getProjects);
// GET a single workout
router.get("/:id", getProject);

router.post("/", createProject);

// UPDATE a workout
router.patch("/:id", updateProject);

router.delete("/", deleteProject);

module.exports = router;
