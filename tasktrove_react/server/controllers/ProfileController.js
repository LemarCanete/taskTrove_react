const UserModel = require('../model/Users')

//get user by id
const GetUser = async (req, res)=>{
    try{
        const id = req.params.id
        const user = await UserModel.findById({_id: id})
        res.status(200).json(user)
    }catch(err){
        res.json(err)
    }
}

// update user by id
const UpdateUser = async(req, res)=>{
    try{
        const id = req.params.id
        const user = await UserModel.findByIdAndUpdate({_id: id}, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        })
        res.json(user)
    }catch(err){
        res.json(err)
    }
}

module.exports = {
    GetUser,
    UpdateUser
}