import Task from "../models/task.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

// Create a new task
const createTask = async (req, res, next) => {
  try {
    // Extract priority, category, and task from the request body
    const { priority, category, task } = req.body;

    // Check if priority, category, and task are provided
    if (!priority || !category || !task) {
      // If any of them is missing, throw a 400 Bad Request error
      throw new ApiError(400, "Priority, category, and task are required");
    }

    // Retrieve the user from the request object
    const user = req.user;

    // Create a new Task instance with user's ID, priority, category, and task
    const newTask = new Task({ user: user._id, priority, category, task });

    // Save the new task to the database
    await newTask.save();

    // Return a success response with status code 201 and the newly created task
    return res
      .status(201)
      .json(new ApiResponse(201, newTask, "Task created successfully"));
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    return next(error);
  }
};

// Retrieve all tasks of a particular user
const getAllTaskByUserId = async (req, res, next) => {
  try {
    // Extract the user ID from the request parameters
    const { id } = req.params;

    // Find all tasks associated with the given user ID
    const tasks = await Task.find({ user: id });

    // Return a success response with status code 200 and the retrieved tasks
    return res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    return next(error);
  }
};

// Retrieve a single task by ID
const getTaskById = async (req, res, next) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = req.params.id;

    // Find the task by its ID
    const task = await Task.findById(taskId);

    // If the task is not found, throw a 404 error
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    // Return a success response with status code 200 and the retrieved task
    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task retrieved successfully"));
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    return next(error);
  }
};

// Update a task by ID
const updateTaskById = async (req, res, next) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = req.params.id;

    // Extract the updated task details from the request body
    const { task, priority, category } = req.body;

    // Find and update the task by its ID, and return the updated task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { task, priority, category },
      { new: true }
    );

    // If the task is not found, throw a 404 error
    if (!updatedTask) {
      throw new ApiError(404, "Task not found");
    }

    // Return a success response with status code 200 and the updated task
    return res
      .status(200)
      .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    return next(error);
  }
};

// Delete a task by ID
const deleteTaskById = async (req, res, next) => {
  try {
    // Extract the task ID from the request parameters
    const taskId = req.params.id;

    // Find and delete the task by its ID, and return the deleted task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // If the task is not found, throw a 404 error
    if (!deletedTask) {
      throw new ApiError(404, "Task not found");
    }

    // Return a success response with status code 200 and a message indicating successful deletion
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Task deleted successfully"));
  } catch (error) {
    // If an error occurs, pass it to the error-handling middleware
    return next(error);
  }
};

export {
  createTask,
  getAllTaskByUserId,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
