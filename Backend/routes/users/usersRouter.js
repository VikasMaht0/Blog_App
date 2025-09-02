const express = require("express");
const { register,login,getProfile, blockUser, unblockUser, viewOtherProfile, followingUser } = require('../../controllers/users/usersController');
const isLoggedIn = require("../../middlewares/isLoggedIn");

const usersRouter = express.Router();

//!Register Route
usersRouter.post('/register', register);

//!Login Route
usersRouter.post("/login",login);

//!Profile Route
usersRouter.get("/profile",isLoggedIn,getProfile);

//!Block user Route
usersRouter.put("/block/:userIdToBlock",isLoggedIn,blockUser);

//!unBlock user Route
usersRouter.put("/unblock/:userIdToUnBlock",isLoggedIn,unblockUser);

//!View another profile user Route
usersRouter.get("/view-other-profile/:userProfileId",isLoggedIn,viewOtherProfile);

//!Follow a user Route
usersRouter.put("/following/:userIdToFollow",isLoggedIn,followingUser);

//!UnFollow a user Route
usersRouter.put("/unfollowing/:userIdToUnFollow",isLoggedIn,followingUser);


module.exports = usersRouter; 