const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
const {globalErrorHandler , notFound} = require("./middlewares/globleErrorHandler");
const categoriesRouter = require("./routes/categories/categoriesRouter");
const postsRouter = require("./routes/posts/postsRouter");
const commentsRouter = require("./routes/comments/commentsRouter");
const sendEmail = require("./utils/sendEmail");
//!Create an express app
sendEmail("vikask11012000@gmail.com","HelloWelcome123");
const app = express();

//!load the environment variable
dotenv.config();

//!Establish connection to MongoDB
connectDB();

//!setup the middleware
app.use(express.json());
//cors middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//?setup the userRouter
app.use("/api/v1/users",usersRouter);
//?setup the categoryRouter
app.use('/api/v1/categories',categoriesRouter);
//?serup thr postRouter
app.use("/api/v1/posts",postsRouter)
//?serup thr commentRouter
app.use("/api/v1/comments",commentsRouter);

//?Not found error handler
app.use(notFound);

//?setup the global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 9080;
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})


