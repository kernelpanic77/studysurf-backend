const mongoose = require('mongoose');
const { Timestamp } = mongoose.Types;

const SubmissionSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    status: {
        type: String, 
        enum: ['DUE', 'ONTIME', 'OVERDUE'],  
        required: true
    },  
    timestamp: {
        type: Date, 
        required: true
    }, 
    documentCID: {
        type: String, 
        required: true
    }
})

const ClassworkSchema = new mongoose.Schema({ 
    courseID: {
        type: String, 
        required: true,
    }, 
    submissionType: {
        type: String,  
        enum: ['FILE', 'TEXT'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date, 
        required: true
    }, 
    facultyEmail: {
        type: String, 
        required: true
    },
    submissions: {
        type: [SubmissionSchema],
        required: true
    }
}, {collection: "classwork"})

const Classwork = mongoose.model("classwork", ClassworkSchema);
module.exports = Classwork;