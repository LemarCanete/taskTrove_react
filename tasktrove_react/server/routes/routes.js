const express = require('express')
const {Register, Login} = require('../controllers/AuthenticationController') 
const { GetUser, UpdateUser } = require('../controllers/ProfileController')
const { AddTeam, GetTeams, EditTeam, GetAllUsers, GetTeamByTeamName, GetLeaderInfo, GetMembersInfo, AddUserToTeam, DeleteTeamMember } = require('../controllers/TeamsController')
const { AddProject, GetProjectsByProjectId } = require("../controllers/ProjectsController")
const {GetTasksByProjectId, GetTeamByProjectId, AddTask} = require("../controllers/TaskController")
const router = express.Router()

//REGISTER
router.post('/register', Register)

//LOGIN
router.post('/login', Login);

//PROFILE
router.get('/getUser/:id', GetUser)
router.put('/updateUser/:id', UpdateUser)

//TEAMS
router.post('/addTeam', AddTeam);
router.get('/getTeams/:user_id', GetTeams)
router.put('/editTeam', EditTeam)
router.get('/getAllUsers', GetAllUsers)
router.get(`/getTeam/:teamName`, GetTeamByTeamName)
router.get('/getMembersInfo/:memberIds', GetMembersInfo)
router.get('/getLeaderInfo/:leader_id', GetLeaderInfo)
router.post('/addUserToTeam', AddUserToTeam)
router.delete('/deleteTeamMember', DeleteTeamMember)

//PROJECTS
router.post('/addProject', AddProject)
router.get('/getProjects/:projectIds', GetProjectsByProjectId);

//TASKS
router.get('/getTeamByProjectId/:project_id', GetTeamByProjectId)
router.get('/getTasks/:id', GetTasksByProjectId);
router.post('/addTask', AddTask)


module.exports = router