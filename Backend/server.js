const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
const {globalErrorHandler , notFound} = require("./middlewares/globleErrorHandler");
const categoriesRouter = require("./routes/categories/categoriesRouter");
//!Create an express app
const app = express();

//!load the environment variable
dotenv.config();

//!Establish connection to MongoDB
connectDB();

//!setup the middleware
app.use(express.json());

//?setup the userRouter
app.use("/api/v1/users",usersRouter);
//?setup the categoryRouter
app.use('/api/v1/categories',categoriesRouter);

//?Not found error handler
app.use(notFound);

//?setup the global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 9080;
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})


