const errorMiddleware = (err, req, res, next) => {
  // Set default error message and status code if not provided
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  // Send error response with appropriate status code and message
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
    success: false,
  });
};

export default errorMiddleware;
