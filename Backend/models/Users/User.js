const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true,

    },
    email:{
        type: String,
        require: true,
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    password:{
        type: String,
        require: true,
    },
    lastlogin:{
        type: Date,
        default: Date.now()
    },
    isverified:{
        type: Boolean,
        default: false
    },
    accountLevel:{
        type: String,
        enum: ["bronze","silver","gold"],
        default:"bronze"
    },
    profilePicture: {
        type: String,
        default:""
    },
    coverImage:{
        type: String,
        default:""
    },
    bio: {
        type: String,

    },
    location: {
        type: String
    },
    notificationType: {
        email:{ type: String, require: true},
    },
    gender: {
        type: String,
        enum: ["male","female","prefer not to say","non-binary"]
    },
    //other property will deal with relationship
    profileViewers: [{ type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    followers: [{ type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{ type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    blockedUsers: [{ type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    posts: [{ type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
    likePosts: [{ type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
    passwordResetToken:{
        type: String,
    },
    passwordResetExpires:{
        type:Date,
    },
    accountVerificationToken:{
        type: String,
    },
    accountVerificationExpires:{
        type: Date,
    },
},  
   {

   timestamps:true,
    
});

//!convert schema to model

const User = mongoose.model("User", userSchema);
module.exports = User;