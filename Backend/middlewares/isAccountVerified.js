const User = require("../models/Users/User");
const isAccountVerified = async(req,res)=>{
    try{
          //Find user by Id 
          const currentUser = await User.findById(req.userAuth._id);
          //check whether the user is verified
          if(currentUser){
            next();
          }else{
            res.status(401).json({message:"Account not verified"})
          }
    }catch(error){
            res.status(500).json({message:"server error",error});

    }
};

module.exports=isAccountVerified;