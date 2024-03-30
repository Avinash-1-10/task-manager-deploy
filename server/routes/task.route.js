import express from "express";
import {
  createTask,
  getAllTaskByUserId,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST - Create a new task
router.post("/", verifyJwt, createTask);

// GET - Get all tasks associated with a user
router.get("/user/:id", verifyJwt, getAllTaskByUserId);

// GET - Get a single task by ID
router.get("/:id", verifyJwt, getTaskById);

// PUT - Update a task by ID
router.put("/:id", verifyJwt, updateTaskById);

// DELETE - Delete a task by ID
router.delete("/:id", verifyJwt, deleteTaskById);

export default router;
