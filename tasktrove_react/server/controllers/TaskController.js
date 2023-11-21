const mongoose = require('mongoose')
const TeamModel = require("../model/Teams")
const UserModel = require("../model/Users")
const ProjectModel = require("../model/Projects")
const TasksModel = require('../model/Tasks')

//get the tasks of the project by project id
const GetTasksByProjectId =  async (req, res) => {
    try {
        const project_id = req.params.id;

        const tasks = await TasksModel.find({ project_id: project_id });

        // Use Promise.all to wait for all user queries to complete
        const users = await Promise.all(tasks.map(async (task) => {
            const user = await UserModel.find({ _id: task.assignTo });
            return user; // Return the user object
        }));

        // Use map to combine tasks and users into a new array
        const taskMap = tasks.map((task, index) => {
            return { ...task.toObject(), user: users[index] }; // Combine task and user
        });

        res.json(taskMap);
    } catch (err) {
        res.json(err);
    }
}


//get Team by project id
const GetTeamByProjectId = async (req, res) => {
    try {
        const project_id = req.params.project_id;
        const team = await TeamModel.find({
            projects: { $in: [new mongoose.Types.ObjectId(project_id)] },
        });
    
        res.json(team);
    } catch (err) {
        res.json(err);
    }
};

const AddTask = async (req, res)=>{
    try{
        const project_id = new mongoose.Types.ObjectId(req.body.project_id)
        const assignTo = new mongoose.Types.ObjectId(req.body.assignTo)

        const task = await TasksModel.create({...req.body, project_id, assignTo})
        res.json(task)
    }
    catch(err){
        res.json(err)
    }
}
module.exports = {
    GetTasksByProjectId,
    GetTeamByProjectId,
    AddTask,
}