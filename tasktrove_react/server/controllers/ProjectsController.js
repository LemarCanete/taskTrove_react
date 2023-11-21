const mongoose = require('mongoose')
const TeamModel = require("../model/Teams")
const UserModel = require("../model/Users")
const ProjectModel = require("../model/Projects")

//add a Project database and add the project id to the team projects
const AddProject = async (req, res)=>{
    try{
        const team_id = new mongoose.Types.ObjectId(req.body.team);

        const project = await ProjectModel.create({ ...req.body, team_id })

        //ADD PROJECT_ID TO TEAM
        const updatedTeam = await TeamModel.findOneAndUpdate(
            {_id: team_id},
            {$addToSet: {projects: project._id}},
            {new: true}
        )
        console.log(updatedTeam);

        res.json({updatedTeam, project})
        
    } catch(err){
        res.json(err)
    }
}

//get projects of the current user from the teams
const GetProjectsByProjectId = async (req, res)=>{
    try{
        const projectIds = req.params.projectIds.split(',')
        const projects = await ProjectModel.find({_id: {$in: projectIds}})
        

        // Fetch unique team IDs associated with the projects
        const teamIds = [...new Set(projects.map(project => project.team_id))];

        // Fetch teams based on the unique team IDs
        const teams = await TeamModel.find({ _id: { $in: teamIds } });

        // Create a map to quickly look up team information based on team ID
        const teamMap = new Map(teams.map(team => [team._id.toString(), team]));

        // Add team information to each project
        const projectsWithTeamInfo = projects.map(project => ({
            ...project.toObject(),
            team: teamMap.get(project.team_id.toString()) || null,
        }));

        res.json(projectsWithTeamInfo);
    }
    catch(err){
        res.json(err)
    }
}



module.exports = {
    AddProject,
    GetProjectsByProjectId,
    
}   