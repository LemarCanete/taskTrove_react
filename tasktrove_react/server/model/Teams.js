const mongoose = require('mongoose')

const TeamsSchema = new mongoose.Schema({
    leader_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    teamName: String,
    members: Array,
    projects: Array,
}, {timestamps: true })

const TeamModel = mongoose.model('teams', TeamsSchema)


module.exports = TeamModel;