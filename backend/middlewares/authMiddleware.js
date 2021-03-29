import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";


import {UserModel} from '../models/User.model.js';



// export const protectRoute = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await UserModel.findById(decodedToken.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Invalid Token");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("No Token Found");
//   }
// });


export const protectRoute = asyncHandler( async (req, res, next) => {
    let token;

    if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.authorization);

    next();
  }

    console.log(req.headers.authorization);

    // next();
})