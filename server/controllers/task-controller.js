const Task = require("../models/task");

//add a new task
//get all tasks by userid
//delete a task
//edit a task

// Function to add a new task to the database
const addNewTask = async (req, res) => {
  const { title, description, status, userId, priority } = await req.body;

  //validate the schema

  try {
    // Create a new task document in the database
    const newlyCreatedTask = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
    });

    if (newlyCreatedTask) {
      return res.status(200).json({
        success: true,
        message: "Task added successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occured! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

// Retrieves all tasks associated with a specific user ID
const getAllTasks = async (req, res) => {
  const { id } = req.params;

  try {
    // Find all tasks in the database that match the userId
    const extractAllTasksByUserId = await Task.find({ userId: id });

    if (extractAllTasksByUserId) {
      return res.status(200).json({
        success: true,
        tasksList: extractAllTasksByUserId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occured! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

// Updates the details of an existing task
const updateTask = async (req, res) => {
  const { title, description, status, priority, userId, _id } = await req.body;

  try {
    // Find the task by ID and update it with new values
    const updateTask = await Task.findByIdAndUpdate(
      {
        _id,
      },
      {
        title,
        description,
        status,
        priority,
        userId,
      },
      { new: true }
    );

    if (updateTask) {
      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occured! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task id is required",
      });
    }

    const deleteTask = await Task.findByIdAndDelete(id);

    if (deleteTask) {
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Some error occured! Please try again",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

module.exports = { addNewTask, getAllTasks, deleteTask, updateTask };
