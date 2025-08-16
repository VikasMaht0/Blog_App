const jwt = require('jsonwebtoken');
const User = require('../models/Users/User')

const isLoggedIn = (req,res,next) =>{
    //Fetch token from request
    const token = req.headers.authorization?.split(" ")[1]

    //Verify token 
    jwt.verify(token,"secretKey",async(err,decoded)=>{

    //if unsuccessfull then send the erroe message
    if(err){
        return res.status(401).json({status:"failed",message:err?.message})
    }else{
     //if successful , then pass the User object to next path
        const userId=decoded?.user?.id;
        const user =await User.findById(userId).select("username email role _id");

        req.userAuth = user;
        
        next();
       }
    })
    
  
   

};


module.exports = isLoggedIn;