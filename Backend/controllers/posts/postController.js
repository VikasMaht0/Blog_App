const asyncHandler = require('express-async-handler');
const Post = require('../../models/Posts/Post');
const User = require('../../models/Users/User');
const Category =require("../../models/Categories/Categories");


//@desc Create a new post
//@route POST /api/v1/post
//@access private

exports.createPost = asyncHandler(async(req,res,next)=>{
      //Get the payload
      const {title, content, categoryId} = req.body;

      //Check if the post is present

      //Create post object 

      //update category by adding post in it 

     //update user by adding post in it 

     //send the response

})