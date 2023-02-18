const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseID: {
        type: String,
        required: true, 
        unique: true
    },  
    courseName: {
        type: String, 
        required: true
    },
    domain: {
        type: String,
        enum: ['MATH', 'CHEM', 'PHY', 'CS', "BIO"],
        required: true
    }, 
    gist: {
        type: String, 
    }
}, {collection: "course"})

const Course = mongoose.model("course", CourseSchema);
module.exports = Course;