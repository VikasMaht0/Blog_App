const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
//!Create an express app
const app = express();

//!load the environment variable
dotenv.config();

//!Establish connection to MongoDB
connectDB();

//!setup the middleware
app.use(express.json());

//?setup the Router
app.use("/api/v1/users",usersRouter);

const PORT = process.env.PORT || 9080;
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})


