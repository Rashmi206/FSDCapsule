const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: +new Date() + 24 * 60 * 60 * 1000
    },
    priority: {
        type: Number,
        min: 0,
        max: 30,
        default: 0,
        required: true
    },
    finished: {
        type: Boolean,
        default: false,
        required: true
    },
    parentTask: {
        type: String,
        default: null
    }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;