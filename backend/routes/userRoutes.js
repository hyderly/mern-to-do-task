import express from "express";
const router = express.Router();


// Controllers
import { registerUser, authUser, getUserProfile } from "../controllers/userController.js";

// Auth Middleware
import {protectRoute} from '../middlewares/authMiddleware.js';

router.post("/register", registerUser);
router.post("/login", authUser);
router.route("/profile").get(protectRoute, getUserProfile)


export default router;
