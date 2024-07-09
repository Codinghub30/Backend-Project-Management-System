import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tasks: [{
        name: {
            type: String,
            required: true,
        },
        assignee: {
            type: String, // or [String] if multiple assignees are allowed
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    }],
    status: {
        type: String,
        enum: ['pending', 'inprogress', 'complete'],
        default: 'pending',
    },
    deadline: {
        type: Date,
    },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
