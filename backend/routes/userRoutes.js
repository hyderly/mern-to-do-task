import express from "express";
const router = express.Router();

// Controllers
import {
  registerUser,
  authUser,
  getUserProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";

// Auth Middleware
import { protectRoute } from "../middlewares/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateProfile)
  .delete(protectRoute, deleteProfile);

export default router;
