const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    emailAddress: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;