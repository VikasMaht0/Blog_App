const express = require('express');
const {createComment, deleteComment, updateComment} = require('../../controllers/comments/commentsController');
const isLoggedIn =  require('../../middlewares/isLoggedin');


const commentsRouter = express.Router();

//?Create comment route
commentsRouter.post("/:postId",isLoggedIn,createComment);

//?Delete comment route
commentsRouter.delete("/:commentId",isLoggedIn,deleteComment);

//?Update comment route
commentsRouter.put("/:commentId",isLoggedIn,updateComment);



module.exports = commentsRouter;