import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const verifyJwt = async (req, res, next) => {
  try {
    // Retrieve token from cookies or Authorization header
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token)

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Unauthorized request", false));
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded token's _id
    const user = await User.findById(decodedToken?._id).select("-password");

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid access token", false));
    }

    // Attach user object to request for further use in the route handler
    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(500).json(new ApiResponse(500, null, error.message, false));
  }
};

export default verifyJwt;
