const express = require("express");
const { register,login,getProfile, blockUser, unblockUser, viewOtherProfile, followingUser, forgotPassword, resetPassword, accountVerificationEmail, verifyAccount } = require('../../controllers/users/usersController');
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

//!Forgot password
usersRouter.put("/forgot-password",forgotPassword);

//!Reset password
usersRouter.put("/reset-password/:resetToken",resetPassword);

//!send account verification Email route
usersRouter.put("/account-verification-email",isLoggedIn,accountVerificationEmail);

//!Account token verification
usersRouter.put("/verify-account/:verifyToken ",isLoggedIn,verifyAccount);




module.exports = usersRouter; 