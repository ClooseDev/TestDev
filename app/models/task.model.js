const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    icon: String,
    audios: String,
    videos: String,
    albums: String,
    followers: String,
    description: String,
    username: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);