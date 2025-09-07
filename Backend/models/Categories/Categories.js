const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
    },
    author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true,
   },
   shares:{
      type:Number,
      default:0,
   },
   posts:[
   {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
   },
  ]

},  
   {

   timestamps:true,
      toJSON:{
    virtuals: true,
   },
   toObject:{
    virtuals: true,
   },
    
});

//!convert schema to model

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;