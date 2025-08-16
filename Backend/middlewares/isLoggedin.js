const isLoggedIn = (req,res,next) =>{
    console.log("isLogged executed");
    //Fetch token from request
    //Verify token 
    //if successful , then pass the User object to next path
    //if unsuccessfull then send the erroe message
    next();

};


module.exports = isLoggedIn;