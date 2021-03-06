import express from "express";
const router = express.Router();

// Controllers
import {
  registerUser,
  authUser,
  getUserProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  getUserProfileById,
  updateProfileById,
  deleteProfileById,
  forgotPassword,
  resetPassword,
  emailVerify,
} from "../controllers/userController.js";

// Auth Middleware
import {
  protectRoute,
  adminProtectRoute,
} from "../middlewares/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/emailverify/:verifytoken", emailVerify);

router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateProfile)
  .delete(protectRoute, deleteProfile);

router.get("/admin/profiles", protectRoute, adminProtectRoute, getAllUsers);
router
  .route("/profile/:id")
  .get(protectRoute, adminProtectRoute, getUserProfileById)
  .put(protectRoute, adminProtectRoute, updateProfileById)
  .delete(protectRoute, adminProtectRoute, deleteProfileById);

export default router;
