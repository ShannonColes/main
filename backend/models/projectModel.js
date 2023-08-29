// We're are using 'mongoose' to help organize data in a database.
const mongoose = require('mongoose');

// We're making a blueprint for how our project data should look.
const Schema = mongoose.Schema;

// Creating a plan for project data.
const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }

}, { 
    timestamps: true   // This helps keep track of when projects are created or updated.
});

// We're making our project blueprint available for the database to use as 'Project'.
module.exports = mongoose.model('Project', projectSchema);
