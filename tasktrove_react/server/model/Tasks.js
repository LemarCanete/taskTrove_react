const mongoose = require('mongoose')


const TasksSchema = new mongoose.Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'projects', required: true },
    assignTo: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    taskName: String,
    description: String,
    priority: String,
    deadline: Date,
}, {timestamps: true})

const TasksModel = mongoose.model('tasks', TasksSchema)

module.exports = TasksModel;