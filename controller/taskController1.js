import Task from "../model/taskModel.js";

export const createtask = async (req, res) => {
    const { taskName, description, deadline, assignees} = req.body;

    // Input validation
    if (!taskName || !description || !deadline) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Convert deadline to a proper date format
    const deadlineDate = new Date(deadline);

    if (isNaN(deadlineDate)) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

    const newTask = new Task({
        taskName,
        description,
        deadline: deadlineDate,
        assignees
    });

    try {
        await newTask.save();
        return res.status(201).json({ message: "Task is Added Successfully", task: newTask });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

export const getTask = async (req, res) => {
   

    try{
        const validTask  = await Task.find();
        return res.status(200).json(validTask);
       
    }

    catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Server Error", error: err.message });
    }

}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        await Task.findByIdAndDelete(id);

        return res.status(200).json({ message: "Task successfully deleted" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error", error: err.message });

    }
};