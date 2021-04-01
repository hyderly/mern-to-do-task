import express from "express";
const router = express.Router();

import {
  createTask,
  getTasks,
  updateTaskById,
  deleteTaskById,
  getTaskById,
} from "../controllers/taskController.js";

// Auth Middleware
import { protectRoute } from "../middlewares/authMiddleware.js";

router.route("/").post(protectRoute, createTask).get(protectRoute, getTasks);

router
  .route("/:id")
  .put(protectRoute, updateTaskById)
  .delete(protectRoute, deleteTaskById)
  .get(protectRoute, getTaskById);

export default router;
