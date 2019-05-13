const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    const tasks = require('../controllers/task.controller.js');

    app.post('/api/tasks', user.authWrapper(tasks.create));
    app.get('/api/tasks', user.authWrapper(tasks.findAll));
    app.get('/api/tasks/:taskId', user.authWrapper(tasks.findOne));
    app.post('/api/tasks/:taskId', user.authWrapper(tasks.update));
    app.delete('/api/tasks/:taskId', user.authWrapper(tasks.delete));
    app.delete('/api/tasks', user.authWrapper(tasks.deleteAll));
}