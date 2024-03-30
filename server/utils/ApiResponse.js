// ApiResponse class represents a standardized response format for API endpoints.

export default class ApiResponse {
  constructor(statusCode, data, message, success=true) {
    this.statusCode = statusCode; // HTTP status code
    this.data = data; // Response data
    this.message = message; // Message describing the result
    this.success = success;
  }
}
