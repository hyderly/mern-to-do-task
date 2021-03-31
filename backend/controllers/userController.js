import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { UserModel } from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/users/register
// Access: Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(201);
    throw new Error("User Already Exists");
  }

  if (password !== confirmPassword) {
    res.status(201);
    throw new Error("Password does not matched");
  }

  const user = await UserModel.create({ name, email, password });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
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

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter email and password");
  }

  if (!user) {
    res.status(201);
    throw new Error("Wrong email or password");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200);
    res.json({
      id: user._id,
      name: user.name,
      email,
      password,
      token: user.getJwtToken(),
    });
  }
});

// Request: GET
// Route: GET /api/users/profile
// Access: Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await (await UserModel.findById(req.user.id)).select(
    "-password"
  );
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
  const user = await await UserModel.findById(req.user.id);

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
  const user = await await UserModel.findById(req.user.id);
  await user.delete();

  res.status(200);
  res.json({ message: "User deleted" });
});
