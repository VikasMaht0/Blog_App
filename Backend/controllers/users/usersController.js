
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
        res.json({status:"Success",message:"Profile fatched",user});
    
}
);
