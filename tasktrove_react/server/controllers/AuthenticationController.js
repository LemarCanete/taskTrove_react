const UserModel = require('../model/Users')

const Register = async (req, res) =>{
    try{
        const { emailAddress } = req.body;
        const existingUser = await UserModel.findOne({ emailAddress: emailAddress })
        if (existingUser) {
            res.status(203).json({ message: 'Email already exists' });
        }

        if(existingUser === null){
            const newUser = await UserModel.create(req.body);
            console.log(newUser)
            res.status(201).json({ message: 'User created', user: newUser });
        }
    }
    catch(err){
        res.json(err)
    }
}

const Login = async (req, res)=>{
    try{
        const { emailAddress, password } = req.body;
        const user = await  UserModel.findOne({ emailAddress: emailAddress, password: password })
        if (user) {
            res.status(201).json(user);
        } else {
          res.status(401).json({ message: 'Authentication failed' });
        }
    }catch(err){res.json(err)}
}

module.exports = {
    Register,
    Login
}