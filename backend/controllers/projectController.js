const Project = require('../models/projectModel')

//import mongoose
const mongoose = require('mongoose')

const getProjects = async (req,res) => {
    // -1 in sort will put them in descending order (latest first)
    const projects = await Project.find({}).sort({createdAt: -1})
    res.status(200).json(projects)
}
const createProject = async (req,res) =>{
    const {title, description, imageURL} = req.body
        try{
            const project = await Project.create({title, description, imageURL})
            res.status(200).json(project)
        }
        catch (error){
            res.status(400).json({error: error.message})
        }
}

module.exports = {
    getProjects, 
    createProject,
}