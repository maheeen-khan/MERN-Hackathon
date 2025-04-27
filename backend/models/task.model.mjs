import mongoose from "mongoose";
import 'dotenv/config';

const taskSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['To Do', 'In progress', 'Done'],
        default: 'To Do'
    },
    AssignedTo:{
        type: String,
        required: true
    },
    

},{timestamps:true})
const Tasks = mongoose.model('Tasks', taskSchema)
export default Tasks