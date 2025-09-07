const express = require('express');
const { createPost, getAllPosts, getPost, deletePost, updatePost, likePost, disLikePost, schedulePost } = require("../../controllers/posts/postController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAccountVerified = require('../../middlewares/isAccountVerified');


const postsRouter = express.Router();

//?Create post route
postsRouter.post('/', isLoggedIn , isAccountVerified ,createPost);

//?Get all post route
postsRouter.get('/',isLoggedIn,getAllPosts);

//?Get a single post route
postsRouter.get('/:id',getPost);

//?Delete post route
postsRouter.delete('/:id',isLoggedIn,deletePost);

//?Update single post route
postsRouter.put('/:id',isLoggedIn,updatePost);

//?Like A POST
postsRouter.put('/like/:postId',isLoggedIn,likePost);

//?Dislike A POST
postsRouter.put('/dislike/:postId',isLoggedIn,disLikePost);

//?Clap A POST
postsRouter.put('/claps/:postId',isLoggedIn,clapPost);

//?Schedule a post
postsRouter.put('/schedule/:postId',isLoggedIn,schedulePost);


module.exports = postsRouter;