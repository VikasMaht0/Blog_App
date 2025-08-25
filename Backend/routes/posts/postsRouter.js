const express = require('express');
const { createPost, getAllPosts, getPost, deletePost, updatePost } = require("../../controllers/posts/postController");
const isLoggedIn = require("../../middlewares/isLoggedIn");


const postsRouter = express.Router();

//?Create post route
postsRouter.post('/', isLoggedIn ,createPost);

//?Get all post route
postsRouter.get('/',getAllPosts);

//?Get a single post route
postsRouter.get('/:id',getPost);

//?Delete post route
postsRouter.delete('/:id',isLoggedIn,deletePost);

//?Update single post route
postsRouter.put('/:id',isLoggedIn,updatePost);


module.exports = postsRouter;