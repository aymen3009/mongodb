import express from 'express';
import  User from './schema/user.js';
import Project from './schema/projects.js';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
mongoose.connect('mongodb://localhost/user', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB');
    }
});

// crearte new user 
app.post('/user',async (req,res)=>{
    let {name,email,password} = req.body;
    let user = new User({
        name,
        email,
        password
    });
    try{     
        await user.save();
        res.send(user);
    }catch(err){
        res.send(err);
    }
});
// get all users
app.get('/user',async (req,res)=>{
    try{
        let users = await User.find();
        res.send(users);
    }catch(err){
        res.send(err);
    }
});
// get all projects
app.get('/project',async (req,res)=>{
    try{
        let projects = await Project.find();
        res.send(projects);
    }catch(err){
        res.send(err);
    }
});

// create new project
app.post('/project',async (req,res)=>{  
    let {name,description,startDate,endDate,status} = req.body;
    let project = new Project({
        name,
        description,
        startDate,
        endDate,
        status
    });
    try{
        await project.save();
        res.send(project);
    }catch(err){
        res.send(err);
    }
});

// asign a project to user 
app.post('/user/:id/:projectId',async (req,res)=>{
    let {id} = req.params;
    let {projectId} = req.params;
    try{
        let user = await User.findById(id);
        let project = await Project.findById(projectId);
        user.projects.push(project);
        await user.save();
        res.send(user);
    }catch(err){
        res.send(err);
    }
});

// get all projects of a user
app.get('/user/:id/project',async (req,res)=>{
    let {id} = req.params;
    try{
        let user = await User.findById(id).populate('projects');
        res.send(user.projects);
    }catch(err){
        res.send(err);
    }
}
);


       

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
