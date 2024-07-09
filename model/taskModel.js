import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    assignees: {
        type: [String], // Array of strings (assuming assignees are represented by their usernames or IDs)
        required: true,
        default: [] // Default empty array
    }
})

const  Task = mongoose.model('Task', taskSchema);

export default Task;