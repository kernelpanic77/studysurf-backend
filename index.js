const express = require('express');
const mongoose = require('mongoose');
const Courses = require('./models/course.model')
const User = require('./models/user.model')
const db = require('./db');
const { ObjectId } = require('mongodb');
const { Console } = require('console');
const Classwork = require('./models/classwork.model');

const app = express();
app.use(express.json());



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// app.get('/courses', async (req, res) => {
//     try{
//         const courses = await Course.find();
//         res.json(courses);
//     } catch(err) {
//         console.error(err);
//         res.status(500).json({message: 'Internal Server Error'});
//     }
// });

// app.post('/courses', async (req, res) => {
//     const {courseID, universityID, domain, gist} = req.body;

//     try{
//         const course = await Course.create({
//             courseID, universityID, domain, gist
//         });
//         res.json(course);
//     }

//     catch(err) {
//         console.error(err);
//         res.status(500).json({message: 'Internal Server Error'});
//     }
// });

app.get('/details/:userId', async (req, res) => {
    const {userId} = req.params
    try{
        //console.log(userId)
        User.findById(userId).then(user => res.json(user)).catch(err => res.status(500).json(err))
        //res.send({user: user})
    }
    catch(err) {
        console.log(err);
    }
});

app.post('/details', async (req, res) => {
    try{
        //console.log(req.body);
        const {email, name, rollno, userType, contact, courses, facultyID, walletAddress} = req.body;  
        const newUser = new User({email: email, name: name, rollno: rollno, userType: userType, contact: contact, courses: courses, facultyID: facultyID, walletAddress: walletAddress});
        newUser.save()
            .then(() => res.json({status: true, msg: "Account created succesfully!"}))
            .catch(err => res.status(500).json("Error: "+err))
    }
    catch(err){
        console.log(err);
    }
});

app.put('/classes/:userId', async (req, res) => {
    const {userId} = req.params
    const {courses} = req.body;
    try{
        //console.log(userId)
        User.findOneAndUpdate({_id: userId}, {courses: courses}, {returnOriginal: false})
            .then(() => res.json({status: true, msg: "Courses updated successfully!"}))
            .catch(err => res.status(500).json("Error: "+err))
        //res.send({user: user})
    }
    catch(err) {
        console.log(err);
    }
});

app.get('/classes', async (req, res) => {
    try {
        Courses.find({})
              .then(courses => res.json({courses: courses}))
              .catch(err => res.status(500).json("Error: "+err))
    }catch(err){
        console.log(err)
    }
})

app.get('/classes/:courseID', async (req, res) => {
    const {courseID} = req.params;
    //console.log(courseID)
    try {
        Courses.findOne({courseID: courseID, userType: 'STUDENT'})
               .then(course => res.json({course: course}))
               .catch(err => res.status(500).json("Error: "+err))
    }catch(err){
        console.log(err)
    }
})

app.get('/courses/students/:courseID', async (req, res) => {
    const {courseID} = req.params;
    try {
        User.find({courses: courseID})
            .then(users => res.json({students: users}))
            .catch(err => res.status(500).json('Error: '+err))
    }catch (err){
        console.log(err)
    }
})

app.get('/classwork/:classworkID', async (req, res) => {
    const {classworkID} = req.params;
    try {
        Classwork.find({classworkID: classworkID})
            .then(classwork => res.json({classwork: classwork}))
            .catch(err => res.status(500).json('Error: '+err))
    }catch(err){
        console.log(err);
    }
})

// app.get('/classwork/:courseID', async (req, res) => {
//     const {courseID} = req.params;
//     try{
//         Classwork.find({courseID: courseID})
//                 .then(classworks => res.json({classwork: classworks}))
//                 .catch(err => res.status(500).json('Error: '+err))
//     }catch(err){
//         console.log(err);
//     }
// })

app.post('/classwork/', async (req, res) => {
    const {courseID, submissionType, endDate, facultyEmail} = req.body;
    try {
        const cw = new Classwork({courseID: courseID, submissionType: submissionType, startDate: new Date(), endDate: new Date(endDate), facultyEmail: facultyEmail, submissions: []});
        cw.save()
          .then(cwk => res.json({status: true, msg: "Classwork created successfully!", classwork: cwk}))
          .catch(err => res.status(500).json('Error: '+err))
    }catch(err){
        console.log(err);
    }
});


app.get('/classwork/:courseID', async (req, res) => {
    const {courseID} = req.params;
    try  {
        Classwork.find({courseID: courseID})
            .then(cws => res.json({classworks: cws}))
            .catch(err => res.status(500).json('Error: '+err))
    }catch(err){
        console.log(err);
    }
})


app.put('/classwork/:classworkID/submit', async (req, res) => {
    try {
        const {classworkID} = req.params;
        const {studentID, documentCID} = req.body;
        const cw = await Classwork.findById(classworkID);
        if(cw){
            const subDate = new Date();
        }
        console.log(classworkID, studentID);
    } catch (err){
        console.log(err);
    }
});

app.get('/classwork/:classworkID/status/:studentID', async (req, res) => {
    try {
        const {classworkID, studentID} = req.params;
        console.log()
    }catch (err){
        console.log(err);
    }
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
