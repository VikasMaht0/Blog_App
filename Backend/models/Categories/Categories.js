const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
    },
    auther:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true,
   },
   shares:{
      type:Number,
      default:0,
   },
   post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post",
   },

},  
   {

   timestamps:true,
    
});

//!convert schema to model

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;