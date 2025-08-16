const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    message : {
        type: String,
        require: true,
    },
    auther:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true,
   },
   postId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
    require:true
   },

},  
   {

   timestamps:true,
    
});

//!convert schema to model

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;