// Database Structure Definition

const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
   
    name: String,
    message: String,
    email : String,
    flag : String
    }, 
    {
        timestamps: true
    
});

module.exports = mongoose.model("Comments",CommentSchema)
