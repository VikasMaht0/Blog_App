const asyncHandler = require('express-async-handler');
const Post = require('../../models/Posts/Post');
const Comment = require("../../models/Comments/Comments");

//@desc Create a New Comment
//@route POST /api/v1/comments/:postId
//@access private

exports.CreateComment = asyncHandler(async(req,res)=>{
    //Get the payload
    const {message} = req.body;

    //Get the post id
    const postId = req.params.postId;

    //Create the Comment
    const comment = await Comment.create({
         message,
         authorId:req?.userAuth?._id,
         postId 
        });

    //Associate comment with Post
    await Post.findByIdAndUpdate( postId,{
    $push:{ comments : comment._id } ,
    },
    { new : true }
  );
  res.status(201).json({
    status:"Success",
    message:"Comment successfully created ",
    comment
  })
});

