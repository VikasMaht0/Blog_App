const asyncHandler = require('express-async-handler');
const Post = require('../../models/Posts/Post');
const User = require('../../models/Users/User');
const Category =require("../../models/Categories/Categories");


//@desc Create a new post
//@route POST /api/v1/posts
//@access private

exports.createPost = asyncHandler(async(req,res,next)=>{
      //Get the payload
      const {title, content, categoryId} = req.body;

      //Check if the post is present
      const postFound =await Post.findOne({title});
      if(postFound){
            let error = new Error("Post already existing");
            next(error);
      }

      //Create post object 
      const post = await Post.create({
            title,
            content,
            category:categoryId,
            author:req?.userAuth?._id
      });

     //update user by adding post in it 
      const user = await User.findByIdAndUpdate(
            req?.userAuth?._id,
            { $push:{ posts:post._id } },
            { new:true }
      );

      //update category by adding post in it 
      const catg = await Category.findByIdAndUpdate(
            categoryId,
            { $push:{ posts:post._id } },
            { new:true }
      );

     //send the response
     res.json({
      status: "success",
      message: "Post successfully created",
      post,
      user,
      catg,
     })
})

//@desc Get all post
//@route GET /api/v1/posts
//@access public

exports.getAllPosts = asyncHandler(async(req,res,next)=>{
      //fetch all the post from the DB
      const allPost = await Post.find({});
     //send the response
     res.json({
      status: "Success",
      message: "All post successfully fetched",
      allPost,
     });
});

//@desc Get single post
//@route GET /api/v1/posts/:id
//@access public
exports.getPost = asyncHandler(async(req,res,next)=>{
      //get the Id from payload
      const postId = req.params.id;
      //fetch single post from the DB
      const post = await Post.findById(postId);
      if(post){
     //send the response
     res.json({
      status: "Success",
      message: "Post successfully fetched",
      post,
     });
   }else{
      res.json({
      status: "Success",
      message: "No post available for given id",
      
     });
   }
});

//@desc Delete post
//@route DELETE /api/v1/posts/:id
//@access private
exports.deletePost = asyncHandler(async(req,res,next)=>{

      const postId = req.params.id;
      //Delete the post from the DB
      const allPost = await Post.findByIdAndDelete(postId);
     //send the response
     res.json({
      status: "Success",
      message: "Post successfully deleted",
     });
});

//@desc Update post
//@route PUT /api/v1/posts/:id
//@access private
exports.updatePost = asyncHandler(async(req,res,next)=>{

      const postId = req.params.id;
      //get the post object from req
      const post = req.body;
      //Delete the post from the DB
      const updatedPost = await Post.findByIdAndUpdate(postId,post,{new:true,runValidators:true});
     //send the response
     res.json({
      status: "Success",
      message: "Post successfully updated",
      updatedPost
     });
});