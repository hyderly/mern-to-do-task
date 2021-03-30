import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import { TaskModel } from "../models/Task.model.js";


// Request: POST
// Route: POST /api/tasks
// Access: Private
export const createTask = asyncHandler(async (req, res) => {
    const task = await TaskModel.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description
    })

    res.status(200);
    res.json(task)
})


// Request: GET
// Route: GET /api/tasks
// Access: Private
export const getTasks = asyncHandler( async (req, res) => {
    const tasks = await TaskModel.find({user: req.user.id}).populate({
        path: 'user',
        select: 'name'
    })

    if(!tasks){
        res.status(400);
        throw new Error('There is no Tasks for you !')
    }

    res.status(200);
    res.json(tasks)
})


// Request: PUT
// Route:   PUT /api/tasks/:id
// Access:  Private

export const updateTaskById = asyncHandler( async (req, res) => {
    const task = await TaskModel.findById(req.params.id);

    if(!task){
        res.status(400);
        throw new Error('There is no Task with this ID')
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.updatedAt = Date.now();

    task.save();


    res.status(200);
    res.json(task);
})


// Request: DELETE
// Route:   DELETE /api/tasks/:id
// Access:  Private

export const deleteTaskById = asyncHandler( async (req, res) => {
    const task = await TaskModel.findById(req.params.id);

    if(!task){
        res.status(400);
        throw new Error('There is no Task with this ID')
    }

    task.delete();

    res.status(200);
    res.json({message: "Task Deleted Successfully"})
})
