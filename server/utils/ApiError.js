// Custom Error class for API errors.
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message); // The error message.
    this.statusCode = statusCode; // The status code of the error.
  }
}

export default ApiError;
