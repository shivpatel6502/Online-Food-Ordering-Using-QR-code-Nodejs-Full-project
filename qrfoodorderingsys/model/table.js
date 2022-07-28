const mongoose = require('mongoose');

// database schema of user
const tableSchema = new mongoose.Schema({
    code: {
        type: Number,
        trim: true
    },
    tbl:[{
        tblno:Number,
        availst:{type:Number,default:0}
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Table", tableSchema, 'tbltable');