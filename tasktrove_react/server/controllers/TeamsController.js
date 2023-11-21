const mongoose = require('mongoose')
const TeamModel = require("../model/Teams")
const UserModel = require("../model/Users")

//Add a team
const AddTeam = async (req, res) => {
    try {
        const leader_id = new mongoose.Types.ObjectId(req.body.leader_id);
        const { teamName } = req.body;
        console.log(leader_id, teamName);
        // Check if a team with the same name already exists
        const existingTeam = await TeamModel.findOne({ teamName });

        if (existingTeam) {
            return res.status(400).json({ error: 'Team with the same name already exists' });
        }

        // If no team with the same name, create a new team
        const newTeam = await TeamModel.create({ ...req.body, leader_id });
        console.log(newTeam);
        res.json(newTeam);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Get Teams
const GetTeams = async (req, res)=>{
    try{
        const user_id = req.params.user_id
        const member_id = new mongoose.Types.ObjectId(user_id)
        const team = await TeamModel.find({
            $or: [
            { leader_id: user_id },
            { members: { $in: [member_id] } },
            ],
        })
        
        res.json(team)
    }
    catch(err){
        res.json(err)
    }
}

//edit team
const EditTeam = async (req, res)=>{
    try{    
        const {_id, teamName} = req.body
        const team = await TeamModel.findOneAndUpdate({_id}, {teamName}, {new:  true})
        res.json(team)
    }catch(err){
        res.json(err)
    }
}

//get all user for the adding of members to the team
const GetAllUsers = async(req, res)=>{
    try{
        const users = await UserModel.find()
        res.json(users)
    }catch(err){
        res.json(err)
    }
}

//get team by team name
const GetTeamByTeamName =  async(req, res)=>{
    try{
        const teamName = req.params.teamName
        console.log(teamName);
        const team = await TeamModel.find({teamName})

        res.json(team)
    }
    catch(err){
        res.json(err)
    }
}

//get members info by the member ids
const GetMembersInfo = async (req, res)=>{
    try {
        console.log(req.params.memberIds)
        const membersIds = req.params.memberIds.split(',')
        const users = await UserModel.find({_id: {$in: membersIds}})
        
        res.json(users)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//get leaders info by leaders id
const GetLeaderInfo = async (req, res) =>{
    try{
        const leader_id = req.params.leader_id
        const leader = await UserModel.find({_id: leader_id})

        res.json(leader)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

//add user to team
const AddUserToTeam = async (req, res)=>{
    try {
        const user_id = new mongoose.Types.ObjectId(req.body.addUser);
        const teamName = req.body.teamName;

        // Find the team with the specified teamName
        const team = await TeamModel.findOne({ teamName });

        // Check if the user is the leader of the team
        if (team && team.leader_id.equals(user_id)) {
            return res.json("Leader should not be a member");
        }

        // Add the user to the team members
        const updatedTeam = await TeamModel.findOneAndUpdate(
            { teamName },
            { $addToSet: { members: user_id } },
            { new: true }
        );

        res.json(updatedTeam);
    } catch (err) {
        res.json(err);
    }
}

//delete team member to the team
const DeleteTeamMember = async(req, res) =>{
    try{
        const teamName = req.body.teamName
        const user_id = req.body.user_id

        const updatedTeam = await TeamModel.findOneAndUpdate(
            {teamName},
            {$pull: {members: new mongoose.Types.ObjectId(user_id)}},
            {new: true}
        )
        console.log(updatedTeam);
        res.json(updatedTeam)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    AddTeam,
    GetTeams,
    EditTeam,
    GetAllUsers,
    GetTeamByTeamName,
    GetMembersInfo,
    GetLeaderInfo,
    AddUserToTeam,
    DeleteTeamMember
}