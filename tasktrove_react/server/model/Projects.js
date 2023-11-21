const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'teams' },
    projectName: String,
    description: String,
    status: String,
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now },
})

const ProjectModel = mongoose.model("projects", ProjectSchema)

module.exports = ProjectModel