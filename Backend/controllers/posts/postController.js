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
            author:req?.userAuth?._id,
            image: req.file.path
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
//@access private
exports.getAllPosts = asyncHandler(async(req,res,next)=>{
     //Get the current user
     const currentUserId = req.userAuth._id;

     //Get the current Time
     const currentDateTime = new Date();

     //Get all those users who have blocked the current user
     const usersBlockingCurrentUser = await User.find({
      blockedUsers:currentUserId
    });
    //Extract the id of the users who have blocked the current user
    const blockingUsersIds = usersBlockingCurrentUser.map((userObj)=>userObj._id);

    const query = { 
           author:{ $nin:blockingUsersIds },
           $or:[
            {
                  scheduledPublished:{$lte:currentDateTime}, 
                  scheduledPublished:null
            },
      ],

    };
    
    //Fetch those posts author is not in blockingUsersIds
      const allPosts =  await Post.find(query).populate({
        path:"author",
        model:"User",
        select:"email username role"
      }); 

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

//@desc Like a Post
//@route PUT /api/v1/posts/like/:postId
//@access private

exports.likePost = asyncHandler(async(req,res,next)=>{
    //Get the id of the post 
    const {postId} = req.params;
    //Get the current user 
    const currentUserId = req.userAuth._id;
    //Search the post
    const post = await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    //Add the currentUserId to likes array
    await Post.findByIdAndUpdate(postId,{$addToSet:{likes:currentUserId}},{new:true});
    //Remove the currentUserId from dislikes array
    post.dislikes=post.dislikes.filter((userId)=>userId.toString()!==currentUserId.toString()
   );
   //resave the post 
   await post.save();

      
   //send the response
     res.json({
      status: "Success",
      message: "Post liked successfully",
     });

})

//@desc Dislike a Post
//@route PUT /api/v1/posts/dislike/:postId
//@access private
exports.disLikePost = asyncHandler(async(req,res,next)=>{
    //Get the id of the post 
    const {postId} = req.params;
    //Get the current user 
    const currentUserId = req.userAuth._id;
    //Search the post
    const post = await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    //Add the currentUserId to likes array
    await Post.findByIdAndUpdate(postId,{$addToSet:{dislikes:currentUserId}},{new:true});
    //Remove the currentUserId from likes array
    post.likes=post.likes.filter((userId)=>userId.toString()!==currentUserId.toString()
   );
   //resave the post 
   await post.save();

      
   //send the response
     res.json({
      status: "Success",
      message: "Post disliked successfully",
     });

})

//@desc Clap a Post
//@route PUT /api/v1/posts/claps/:postId
//@access private
exports.clapPost = asyncHandler(async(req,res,next)=>{
    //Get the id of the post 
    const {postId} = req.params;
    //Search the post
    const post = await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    //implement claps
    const currentPost = await Post.findByIdAndUpdate(
      postId,
      {
      $inc:{ claps: 1 }
      }, 
      {new:true}
    );
      //send the response
     res.json({
      status: "Success",
      message: "Post clapped successfully",
     });
});

//@desc schedule a Post
//@route PUT /api/v1/posts/schedule/:postId
//@access private

exports.schedulePost = asyncHandler(async(req,res,next)=>{
   //Get the data 
   const {postId} = req.params;
   const { scheduledPublish } = req.body;
   //check if postId and scheduledPublish are present
    if(!postId || !scheduledPublish){
      let error = new Error("PostId and scheduled Date are required");
      next(error);
      return;
    }
    //Find the Post from DB
    const post = await Post.findById(postId);
    if(!post){
      let error = new Error("Post not found");
      next(error);
      return;
    }
    //Check if the currentUser is the author 
    if(post.author.toString()!==req.userAuth._id.toString()){
       let error = new Error("You can schedule only your post");
      next(error);
      return;
    }
    const scheduleDate = new Date(scheduledPublish);
    const currentDate = new Date();
    if(scheduleDate<currentDate){
       let error = new Error("Scheduled date cannot be previous date ");
      next(error);
      return;
    }
    post.scheduledPublished = scheduleDate;
    await post.save();
    //send the response
     res.json({
      status: "Success",
      message: "Post scheduled successfully",
      post,
     });

});