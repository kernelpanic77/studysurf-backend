const express = require('express');
const mongoose = require('mongoose');
const Course = require('./models/course.model');


const app = express();
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/courses', async (req, res) => {
    try{
        const courses = await Course.find();
        res.json(courses);
    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.post('/courses', async (req, res) => {
    const {courseID, universityID, domain, gist} = req.body;

    try{
        const course = await Course.create({
            courseID, universityID, domain, gist
        });
        res.json(course);
    }

    catch(err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
