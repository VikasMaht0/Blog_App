const asyncHandler = require('express-async-handler');
const Post = require('../../models/Posts/Post');
const Comment = require("../../models/Comments/Comments");

//@desc Create a New Comment
//@route POST /api/v1/comments/:postId
//@access private

exports.createComment = asyncHandler(async(req,res)=>{
    //Get the payload
    const { message } = req.body;

    //Get the post id
    const postId = req.params.postId;

    //Create the Comment
    const comment = await Comment.create({
         message,
         author:req?.userAuth?._id,
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

//@desc Delete Comment
//@route DELETE /api/v1/comments/:commentId
//@access private

exports.deleteComment = asyncHandler(async(req,res)=>{
  //Get the commentId to be deleted
  const commentId = req.params.commentId;
  await Comment.findByIdAndDelete(commentId);

    res.status(201).json({
    status:"Success",
    message:"Comment successfully daleted ",
    
  })
})

//@desc Update Comment
//@route PUT /api/v1/comments/:commentId
//@access private

exports.updateComment = asyncHandler(async(req,res)=>{
  //Get the commentId to be deleted
  const commentId = req.params.commentId;
  //Get the message 
  const message = req.body.message;
  const updatedComment = await Comment.findByIdAndUpdate(commentId,{message},{new:true,runValidators:true},);

    res.status(201).json({
    status:"Success",
    message:"Comment successfully Updated ",
    updatedComment
  })
})
