import express from "express";
const router = express.Router();


import {createTask, getTasks, updateTaskById, deleteTaskById} from '../controllers/taskController.js';


// Auth Middleware
import { protectRoute, adminProtectRoute } from "../middlewares/authMiddleware.js";


router
    .route("/")
    .post(protectRoute, createTask)
    .get(protectRoute, getTasks)

router
    .route("/:id")
    .put(protectRoute, updateTaskById)
    .delete(protectRoute, deleteTaskById)



export default router;