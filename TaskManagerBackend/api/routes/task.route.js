module.exports = function (app) {

    const taskController = require('../controllers/task.controller');

    app.route('/api/tasks')
        .get(taskController.list_tasks)
    app.route('/api/task')
        .post(taskController.save_task)

    app.route('/api/task/:id')
        .get(taskController.get_task)
        .put(taskController.update_task)
        .delete(taskController.delete_task)

    app.route('/api/task-parent')
        .get(taskController.get_parent)

}