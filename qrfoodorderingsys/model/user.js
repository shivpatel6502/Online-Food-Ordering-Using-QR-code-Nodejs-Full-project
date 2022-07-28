const mongoose = require('mongoose');

// database schema of user
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String
    },
    phnumber: {
        type: Number
    },
    billno: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema, 'tbluser');