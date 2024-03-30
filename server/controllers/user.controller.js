import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generates an authentication token for a user.
const generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

// Register a new user
const register = async (req, res, next) => {
  try {
    // Extract user details from the request body
    const { name, email, password } = req.body;

    // Check if user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user already exists, return a 400 error indicating user already exists
      return next(new ApiError(400, "User already exists"));
    }

    // Create a new user object with the provided details
    const newUser = new User({ name, email, password });

    // Save the new user to the database
    await newUser.save();

    // Return a success response with status code 201 and a message indicating successful registration
    return res
      .status(201)
      .json(new ApiResponse(201, newUser, "User registered successfully"));
  } catch (error) {
    // If an error occurs during the registration process, pass it to the error-handling middleware
    return next(error);
  }
};

// User login
const login = async (req, res, next) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      // If no user found with the provided email, return a 400 error indicating invalid login credentials
      return next(new ApiError(400, "Invalid login credentials"));
    }

    // Check if the provided password matches the user's hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      // If passwords do not match, return a 400 error indicating invalid login credentials
      return next(new ApiError(400, "Invalid login credentials"));
    }

    // Generate an authentication token for the user
    const token = generateAuthToken(user);
    user.token = token;
    await user.save();

    // Set options for the authentication token cookie
    const options = {
      httpOnly: true,
      secure: true,
    };

    // Fetch the logged-in user from the database and exclude sensitive information
    const loggedInUser = await User.findOne(user._id).select(
      "-password -__v -createdAt -updatedAt -token"
    );

    // Return a success response with status code 200, set the token cookie, and send the logged-in user details along with the token
    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(200, { user: loggedInUser, token }, "Login successful")
      );
  } catch (error) {
    // If an error occurs during the login process, pass it to the error-handling middleware
    return next(error);
  }
};

// User logout
const logout = async (req, res, next) => {
  try {
    // Access the user object attached to the request by the middleware
    const user = req.user;

    // Clear the token field in the user document
    user.token = undefined;
    await user.save();

    // Clear the token cookie
    res.clearCookie("token");

    // Send a success response with status code 200 and a message indicating successful logout
    return res
      .status(200)
      .json(new ApiResponse(200, null, "Logout successful"));
  } catch (error) {
    // If an error occurs during the logout process, pass it to the error-handling middleware
    return next(error);
  }
};

export { register, login, logout };
