
const User = require('../../models/Users/User')
const bcryptjs = require('bcryptjs');
const generateToken = require('../../utils/generateToken');
const asyncHandler = require('express-async-handler');

//@desc Register new user
//@route POST /api/v1/users/register
//@access public
exports.register = asyncHandler(
    async (req,res,next)=>{
   
    const {username,password,email} = req.body;
    const user = await User.findOne({username});

    if(user){
      throw new Error("User Already Existing");
    }
    const newUser = new User({ username,email,password });
    const salt = await bcryptjs.genSalt(10);    //adding salt for hashing 
    newUser.password = await bcryptjs.hash(password,salt); //hashing the password 



    await newUser.save();
    res.json({
        status:"success",
        message:"User register successfully",
        _id:newUser?.id,
        username:newUser?.username,
        email:newUser?.email,
        role:newUser?.role,
    })
   
}
);


//@desc Login new user
//@route POST /api/v1/users/login
//@access public
exports.login = asyncHandler(
       async(req,res,next) =>{
    
         const {username,password} = req.body;
         const user = await User.findOne({username})
     if(!user){
        throw new Error("Invalid credentials")
     }
     const isMatched = await bcryptjs.compare(password,user?.password)
     if(!isMatched){
        throw new Error("Invalid credentials")
     }
     user.lastlogin=new Date();
      await user.save();

        res.json({ status:"Success", email:user?.email,_id:user?._id,username:user?.username,role:user?.role,token:generateToken(user) });
     
    
    
}
);


//@desc ProfileView new user
//@route GET /api/v1/users/profile/:id
//@access private
exports.getProfile = asyncHandler(
       async(req,res,next)=>{
    console.log("Rec", req.userAuth);
    
        const user =await User.findById(req.userAuth.id)
        res.json({
          status:"Success",
          message:"Profile fatched",
          user
        });    
});

//@desc Block user
//@route PUT /api/v1/users/block/userIdToBlock
//@access private 
exports.blockUser = asyncHandler(async(req,res,next)=>{
    //!find the user id to be blocked 
    const {userIdToBlock} = req.params.userIdToBlock;
    //!check whether the user is present in DB or not 
    const userToBlock = await User.findById(userIdToBlock)
    if(!userToBlock){
      let error = new Error("User not found");
      next(error);
      return;
    }
    //!Get the current user id 
    const userBlocking = req?.userAuth?.id;

    //!Check if it self blocking
    if(userBlocking.toString() === userIdToBlock.toString()){
      return next(new Error("You cannot block yourself"));
    }

    //!Get current user object from DB
    const currentUser= await User.findById(userBlocking);

    //!Check whether the userIdToBlock is already blocked
    if(currentUser.blockedUsers.includes(userIdToBlock)){
      return next(new Error("This User has already blocked!"));
    }

    //!Push the user to be blocked in the blockedUsers array
    currentUser.blockedUsers.push(userIdToBlock);
    await currentUser.save();

    res.json({
          status:"Success",
          message:"User blocked successfully",
    }); 
})
  
//@desc Unblock user
//@route PUT /api/v1/users/unblock/userIdToBlock
//@access private 
exports.unblockUser = asyncHandler(async(req,res,next)=>{
      const userIdToUnblock = req.params.userIdToBlock;

      //!Find the user in the DB
      const userToUnBlock = await User.findById(userIdToUnblock);
       if(!userToUnBlock){
        let error = new Error("User unblock not found");
        next(error);
        return;
       }
      //!Find the current user
      const userUnBlocking = req?.userAuth?._id;
      const currentUser = await User.findById(userUnBlocking);
      
      //!Check if the user to unblock is already unblocked
      if(!currentUser.blockedUsers.includes(userIdToUnblock)){
        return next(new Error("This User is not blocked"));
      }
     //!Remove the user from the current user blockedUsers array
      currentUser.blockedUsers = currentUser.blockedUsers.filter((id)=> {
        return id.toString() !== userIdToUnblock;
      })
      //Update the DB
      await currentUser.save();
      //return the response
      res.json({
        status:"Success",
        message:"User unblocked successfully",
      });                                               
    });
   