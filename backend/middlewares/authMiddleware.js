import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { UserModel } from "../models/User.model.js";

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decodedToken.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid Token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No Token Found");
  }
});


export const adminProtectRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    console.log(req.user)
    throw new Error("Not autherized as an admin");
    
  }
};
