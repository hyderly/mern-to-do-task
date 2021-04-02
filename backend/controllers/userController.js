import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import sendMail from "../utils/sendEmail.js";

import { UserModel } from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/users/register
// Access: Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, isAdmin } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(201);
    throw new Error("User Already Exists");
  }

  if (password !== confirmPassword) {
    res.status(201);
    throw new Error("Password does not matched");
  }

  const user = await UserModel.create({ name, email, password, isAdmin });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid mail or password");
  }
});

// Request: POST
// Route: POST /api/users/login
// Access: Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  // Check password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Wrong email or password");
  }

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter email and password");
  }

  if (!user) {
    res.status(400);
    throw new Error("Wrong email or password");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200);
    res.json({
      id: user._id,
      isAdmin: user.isAdmin,
      name: user.name,
      email,
      password,
      token: generateToken(user._id),
    });
  }
});

// Request: POST
// Route: POST /api/users/forgotpassword
// Access: Public
export const forgotpassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
    next();
  }

  const resetToken = user.getResetPasswordToken();

  user.save({ validateBeforeSave: false });

  // Create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetpassword/${resetToken}`;

  const message = `Your reset password link ${resetUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Password Reset Token",
      message,
    });

    res.status(200).json({ success: true, message: "mail sent" });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500);
    throw new Error("Email could not be sent");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Request: GET
// Route: GET /api/users/profile
// Access: Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id).select("-password");
  if (user) {
    res.status(200);
    res.json(user);
  }

  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Request: PUT
// Route: PUT /api/users/profile
// Access: Private

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;

  user.save();

  res.status(200);
  res.json({
    name: user.name,
    email: user.email,
  });
});

// Request: DELETE
// Route: DELETE /api/users/profile
// Access: Private
export const deleteProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("No User Found with this ID");
  }

  await user.delete();

  res.status(200);
  res.json({ message: "User deleted" });
});

// ADMIN ROUTES

// Request: GET
// Route: GET /api/users/profiles
// Access: Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find({});

  if (!users) {
    res.status(400);
    res.json({ message: "No user Found" });
  }

  res.status(200);
  res.json(users);
});

// Request: GET
// Route: GET /api/users/profile/:id
// Access: Private/Admin
export const getUserProfileById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select("-password");
  if (user) {
    res.status(200);
    res.json(user);
  }

  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }
});

// Request: PUT
// Route: PUT /api/users/profile/:id
// Access: Private/Admin

export const updateProfileById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin || user.isAdmin;

  user.save();

  res.status(200);
  res.json({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// Request: DELETE
// Route: DELETE /api/users/profile/:id
// Access: Private/Admin
export const deleteProfileById = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("No User Found with this ID");
  }

  // if(user.isAdmin){
  //   res.status(400);
  //   throw new Error("A Admin Cannot be deteled through application")
  // }

  await user.delete();

  res.status(200);
  res.json({ message: "User deleted" });
});
