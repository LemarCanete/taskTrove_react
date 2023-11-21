const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/routes')

const app = express();

app.use(cors())
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})
app.set('trust proxy', 1) // trust first proxy

//routes
app.use('/', routes)

mongoose.connect('mongodb+srv://admin:admin@cluster0.z1y1qif.mongodb.net/taskTrove?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3001, console.log("listening at port 3001"))
}).catch(err => console.log(err))