const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    task_id: {type: mongoose.Schema.Types. ObjectId, ref: 'tasks'},
    project_id: {type: mongoose.Schema.Types.ObjectId, ref: 'projects'},
    file: File
})

const FileModel = mongoose.Model("files", FileSchema)

module.exports = FileModel;