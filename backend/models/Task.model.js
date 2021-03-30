import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user", // refer to user collection
    },
    title: {
        type: "String",
        require: [true, "Please add task title"]
    },
    description: {
        type: "String",
        required: [true, "Please add task description"]
    },
    createdAt: {
        type: 'String',
        default: Date.now()
    },
    updatedAt: {
        type: "String",
        default: null
    }
}, {
    timestamps: true
})


export const TaskModel = mongoose.model("task", taskSchema)