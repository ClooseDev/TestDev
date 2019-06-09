const request = require('request');
const Task = require('../models/task.model.js');
const url = require('url');
const token = 'f07d3a83f07d3a83f07d3a83e6f01631ebff07df07d3a83ac802973f118a5ed756b3a9d';
const base_url = 'https://api.vk.com/method/';

exports.create = (req, res) => {

    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Description cannot be empty."
        });
    }

    let id = url.parse(req.body.description).pathname.toString();
    id = id.replace('/', '');
    let reqId = base_url + 'users.get?access_token=' + token + '&user_ids=' + id + '&v=5.95&fields=first_name,followers_count,last_name,photo_max';
    console.log(reqId);
    console.log(id);
    console.log('result');

    request(reqId, {json: true}, (err, _, body) => {
        if (err) {
            return console.log(err);
        }
        if (body.response.length > 0) {
            let userId = body.response[0].id;
            let reqFriends = base_url + 'friends.get?access_token=' + token + '&user_id=' + userId + '&v=5.95&fields=first_name,followers_count,last_name,photo_max&order=name';
            request(reqFriends, {json: true}, (err, _, body) => {
                if (err) {
                    return console.log(err);
                }
                if (body.response.items.length > 0) {
                    for (i = 0; i < body.response.items.length; i++) {
                        let item = body.response.items[i];
                        if (item.first_name.length == 0) {
                            continue;
                        }
                        // if (typeof(item.followers_count) != "undefined") {
                        //     console.log('undefined founded');
                        //     continue;
                        // }
                        // Create a Task
                        const task = new Task({
                            firstName: item.first_name,
                            lastName: item.last_name,
                            icon: item.photo_max,
                            description: 'Всего подписчиков: ' + item.followers_count,
                            username: req.username
                        });
                        // Save Task in the database
                        task.save()
                            .then(data => {
                                res.send(data);
                            }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Task."
                            });
                        });
                    }
                }

            });
        }
    });
};

exports.findAll = (req, res) => {
    Task.find({'username': req.username})
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }

    // Find task and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        description: req.body.description
    })
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error updating task with id " + req.params.taskId
        });
    });
};

exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId
                });
            }
            res.send({message: "Task deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.taskId
        });
    });
};

exports.deleteAll = (req, res) => {
    Task.remove({})
        .then(task => {
            res.send({message: "Tasks deleted successfullly."});
        }).catch(err => {
        return res.status(500).send({
            message: "Couldn't delete tasks."
        });
    });
};
