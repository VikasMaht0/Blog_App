const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    title : {
        type: String,
        require: true,
    },
    image:{
        type: String,
        require: true,
    },
    claps:{
       type: Number,
       default: 0
    },
    content:{
        type:String,
        require: true,
    },
   auther:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true,
   },
   share:{
    type:Number,
    default:0
   },
   postViews:{
    type:Number,
    default:0
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    require:true,
   },
   scheduledPublished:{
    type:Date,
    default: null,
   },
   likes:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
  ],
  dislikes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
  ],
  comments:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comments"
  }
  ],

},  
   {

   timestamps:true,
    
});

//!convert schema to model

const Post = mongoose.model("Post", postSchema);
module.exports = Post;