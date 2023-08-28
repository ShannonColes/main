//Import express
const express = require ('express')
const router = express.Router()

//Import controllers
const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
} = require ('../controllers/projectController')

const multer = require("multer")
const path = require("path")

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Store uploads in this directory
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext); // Use unique filenames
    },
  });
  
  const upload = multer({ storage });

router.get('/', getProjects)

// GET a single workout
router.get('/:id', getProject)

router.post('/', createProject)

// UPDATE a workout
router.patch('/:id', updateProject)

router.delete('/', deleteProject)

module.exports = router;