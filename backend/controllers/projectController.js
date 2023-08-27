const Project = require('../models/projectModel')

//import mongoose
const mongoose = require('mongoose')

const getProjects = async (req,res) => {
    // -1 in sort will put them in descending order (latest first)
    const projects = await Project.find({}).sort({createdAt: -1})
    res.status(200).json(projects)
}

const getProject = async (req, res ) => {
    const { id } = req.params
		
		// Check if id is MongoDB valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Projects'})
    }

		// Try find a workout by its id - will set workout to it if successful
    const project = await Project.findById(id)

		// if not workout found show an error
    if(!project) {
        return res.status(404).json({error: 'No such project'})
    }

		//Otherwise return the workout found
    res.status(200).json(project)
}

const createProject = async (req,res) =>{
    const {title, description, imageURL} = req.body
        try{
            const project = await Project.create({title, description, imageURL, user_id})
            res.status(200).json(project)
        }
        catch (error){
            res.status(400).json({error: error.message})
        }
}

// update a workout
const updateProject = async (req,res) => {
    const {id} = req.params

		//check if the id is MongoDB valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Project'})
    }

		// find a work by its id and if it finds it
		// spread out the properties and change what it recieves
		// from the request body eg it could just be the title changed or everything
    const project = await Project.findOneAndUpdate({_id: id}, {
        ...req.body        
    })

		//if it cant find a workout by a valid id:
    if(!project) {
        return res.status(404).json({error: 'No such project'})
    }

		// Otherwise return the updated workout
    res.status(200).json(project)
}

const deleteProject = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such project'})
    }

    const project = await Project.findOneAndDelete({_id: id})

    if(!project) {
        return res.status(404).json({error: 'No such project'})
    }
    
    res.status(200).json(project)
}

module.exports = {
    getProjects,
    getProject, 
    createProject,
    updateProject,
    deleteProject
}