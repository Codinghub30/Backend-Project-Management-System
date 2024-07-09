// controllers/projectController.js
import Project from '../model/projectModel.js';
import mongoose from 'mongoose';

// Controller functions

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a project
export const createProject = async (req, res) => {
    const project = req.body;

    const newProject = new Project(project);

    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No project with that id');

    try {
        await Project.findByIdAndDelete(id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProjectStatus = async (req, res) => {
    const projectId = req.params.projectId;
    const { status } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, { status }, { new: true });
        
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project status:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
