import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan'

import connectDB from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';

// Routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(morgan("dev"))


app.get("/", (req, res) => {
  res.send("API running ...");
});

app.use("/api/users", userRoutes);


app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT}`)
);
