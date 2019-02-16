const taskSchema = require("../models/task.model");

exports.list_tasks = function (req, res) {
    taskSchema.find({}, function (err, tasks) {
        if (err)
            console.log(err);
        res.json(tasks);
    });
}

exports.get_task = function (req, res) {
    taskSchema.findById(req.params.id, function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.save_task = function (req, res) {
    var taskInstance = new taskSchema(req.body);
    taskInstance.save(function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.update_task = function (req, res) {
    taskSchema.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.delete_task = function (req, res) {
    taskSchema.findByIdAndDelete(req.params.id, function (err, task) {
        if (err)
            console.log(err);
        res.json(task);
    });
}

exports.get_parent = function (req, res) {
    taskSchema.find().distinct('parentTask', { "parentTask": { $ne: null } }, function (err, parents) {
        if (err)
            console.log(err);
        res.json(parents);
    });
}