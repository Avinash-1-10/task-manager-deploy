import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDatabase from "./db/index.js";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

// Load environment variables from .env file
dotenv.config();

// Set the port for the server
const PORT = process.env.PORT || 4000;

// Initialize Express application
const app = express();

// Connect to the MongoDB database
connectToDatabase();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// Middleware for handling errors
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
