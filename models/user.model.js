const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }, 
        name: {
            type: String,
            lowercase: true, 
        },
        rollno: {
            type: String,  
            trim: true, 
        },  
        walletAddress: {
            type: String, 
            unique: true, 
            trim: true,
        },
        userType: {
            type: String, 
            enum: ['TEACHER', 'STUDENT'],
            required: true
        }, 
        contact: {
            type: Number,
            match: [/d{10}/, "Please enter a valid phone number"]
        }, 
        facultyID: {
            type: String, 
        }, 
        courses: {
            type: [String],
        }
    }, 
    {collection: "user"}
);


const User = mongoose.model("user", UserSchema);
module.exports = User;