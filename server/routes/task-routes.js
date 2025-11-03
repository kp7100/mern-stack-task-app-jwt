/**************************************************************
 * This file defines all task-related API routes for the server.
 * It handles creating, retrieving, updating, and deleting tasks.
 **************************************************************/

const express = require("express");
const taskRouter = express.Router();

const {
  getAllTasks,
  addNewTask,
  deleteTask,
  updateTask,
} = require("../controllers/task-controller");

// Route to add a new task
taskRouter.post("/add-new-task", addNewTask);

// Route to get all tasks for a specific user by user ID
taskRouter.get("/get-all-tasks-by-userid/:id", getAllTasks);

// Route to delete a task by task ID
taskRouter.delete("/delete-task/:id", deleteTask);

// Route to update an existing task
taskRouter.put("/update-task", updateTask);

module.exports = taskRouter;
