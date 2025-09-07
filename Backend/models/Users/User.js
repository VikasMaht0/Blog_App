const mongoose = require("mongoose");
const crypto = require("crypto");
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
      toJSON:{
    virtuals: true,
   },
   toObject:{
    virtuals: true,
   },
    
});
userSchema.methods.generatePasswordResetToken =function(){
    //generate token
   const resetToken = crypto.randomBytes(20).toString("hex");
   this.passwordResetToken = crypto
   .createHash("sha256")
   .update(resetToken)
   .digest("hex");
   console.log("reset token",resetToken);
   console.log("hashed token",this.passwordResetToken)
   //set the expiry time to 10 min
   this.passwordResetExpires=Date.now()+10*60*1000;
    return resetToken;
}

userSchema.methods.generateAccountVerificationToken = function(){
    //generate token
   const verificationToken = crypto.randomBytes(20).toString("hex");
   this.accountVerificationToken = crypto
   .createHash("sha256")
   .update(verificationToken)
   .digest("hex");
   console.log("reset token",verificationToken);
   console.log("hashed token",this.accountVerificationToken)
   //set the expiry time to 10 min
   this.accountVerificationExpires=Date.now()+10*60*1000;
    return verificationToken;
}

//!convert schema to model
const User = mongoose.model("User", userSchema);
module.exports = User;