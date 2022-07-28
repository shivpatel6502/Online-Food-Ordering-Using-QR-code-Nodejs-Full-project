const mongoose = require('mongoose');

// database schema of user
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    imagePath:{
        type:String,
        required:true,
    }
   
}, {
    timestamps: true
});

module.exports = mongoose.model("menu", menuSchema, 'tblmenu');